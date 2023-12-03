import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';
import { NOTIFICATION_EVENT, NOTIFICATION_MAILING } from 'src/enum/enum';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from './notification.schema'
import { UserIdDTO } from './notification.dto';

@Injectable()
export class NotificationService {

    constructor(
        @Inject(forwardRef(() => NotificationGateway))
        private readonly notificationGateway: NotificationGateway,
        @InjectModel(Notification.name)
        private readonly notificationModel: Model<Notification>,
    ) { }

    async sendNotification(props:
        { rooms: string[], ownerId: string, title: string, fileName: string, name: string, event: NOTIFICATION_EVENT, }) {

        try {
            const { ownerId, rooms } = props

            const roomsWhithoutOwnerId = rooms.filter(item => item !== ownerId)

            await this.notificationGateway.sendNotificationToRooms({ ...props, rooms: roomsWhithoutOwnerId })
        } catch (error) {
            throw new Error()
        }

    }

    async addRoomsNotification(
        props:
            { offlineUserRooms: string[], ownerId: string, title: string, fileName: string, name: string, event: NOTIFICATION_EVENT, }
    ) {
        try {
            const { ownerId, offlineUserRooms, title, fileName, name, event } = props
            Promise.all(
                offlineUserRooms.map(
                    async (userId) => {
                        await this.notificationModel.create({
                            ownerId,
                            userId,
                            title,
                            fileName,
                            name,
                            event,
                            mailing: NOTIFICATION_MAILING.NOTIFICATION_ROOMS,
                        })
                    }
                )
            )

        } catch (error) {
            throw new Error()
        }
    }

    async sendNotificationBroadcast(props:
        { ownerId: string, ownerIdentityId: string, title: string, fileName: string, name: string, event: NOTIFICATION_EVENT, }) {
        try {
            const { ownerId, ownerIdentityId, title, fileName, name, event } = props

            await this.notificationModel.create({
                ownerId,
                ownerIdentityId,
                title,
                fileName,
                name,
                event,
                mailing: NOTIFICATION_MAILING.NOTIFICATION_BROADCAST,
            })

            await this.notificationGateway.sendNotificationBroadcast(props)
        } catch (error) {
            throw new Error()
        }

    }

    async getUserNotification(body: UserIdDTO) {
        try {
            const notification = await this.notificationModel.find({
                $or: [
                    { userId: body.userId },
                    { mailing: NOTIFICATION_MAILING.NOTIFICATION_BROADCAST },
                ],
            })
            .populate({
                path: 'ownerId',
                select: 'fullName avatarFileName'
            })
         
            await this.notificationModel.deleteMany({userId: body.userId})

            return notification.reverse()

        } catch (error) {
            throw new Error()
        }
    }
}
