import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { NotificationService } from './notification.service';
import { Server, Socket } from 'socket.io'
import { NOTIFICATION_EVENT, ONLINEOFFLINE, SOCKET_NOTIFICATION_EVENT } from 'src/enum/enum';
import { Inject, forwardRef } from '@nestjs/common';
import { UserIdentityService } from 'src/user-identity/user-identity.service';

@WebSocketGateway(5001,
    {
        cors: {
            origin: ['http://localhost:5000',
                'http://localhost:3000',
                'https://maps.googleapis.com',
                "http://178.20.154.144:5000",
                "http://178.20.154.144:5001",
                "https://environs.life",
            ],
            credentials: true,
        }
    })
export class NotificationGateway {
    @WebSocketServer()
    server: Server

    constructor(
        @Inject(forwardRef(() => NotificationService))
        private readonly notificationService: NotificationService,

        private readonly userIdentityService: UserIdentityService,
    ){}

    @SubscribeMessage(SOCKET_NOTIFICATION_EVENT.JOIN_ROOM_NOTIFICATION)
    async joinNotificationRoom(
        @ConnectedSocket() socket: Socket,
        @MessageBody() userId: string
    ) {
        const room = String(userId);

        if(userId){
            await this.userIdentityService.profileTextInfo({_id:userId, online: ONLINEOFFLINE.ONLINE})
        }
        
      
    
        if (room) {
            socket.join(room);
        }
       // console.log("notification room----->", this.server.sockets.adapter.rooms);
    }

    @SubscribeMessage(SOCKET_NOTIFICATION_EVENT.LEAVE_ROOM_NOTIFICATION)
    async leaveNotificationRoom(
        @ConnectedSocket() socket: Socket,
        @MessageBody() userId: string
    ) {
        const room = String(userId);

        if(userId){
            await this.userIdentityService.profileTextInfo({_id:userId, online: ONLINEOFFLINE.OFFLINE})
        }
        

        // console.log("lave roome", this.server.sockets.adapter.rooms);
        socket.leave(String(room))
    }

    async sendNotificationToRooms(
        props:
            { rooms: string[], ownerId: string, title: string, fileName: string, name: string, event: NOTIFICATION_EVENT, }) {

        const { rooms, ownerId, title, event, fileName, name } = props

        for (let room of rooms) {
            this.server.to(room).emit(
                SOCKET_NOTIFICATION_EVENT.NOTIFICATION,
                ownerId,
                title,
                fileName,
                name,
                event,
            )
        }

        const offlineUserRooms = rooms.filter(room => !this.server.sockets.adapter.rooms.has(room)  )
        

       
        
        await this.notificationService.addRoomsNotification({
            offlineUserRooms,
            ownerId,
            title,
            fileName,
            name,
            event,
        })
    }

    async sendNotificationBroadcast(
        props:
            { ownerId: string, title: string, fileName: string, name: string, event: NOTIFICATION_EVENT, }) {

        const { ownerId, title, event, fileName, name } = props

        this.server.emit(
            SOCKET_NOTIFICATION_EVENT.NOTIFICATION,
            ownerId,
            title,
            fileName,
            name,
            event,
        )

    }
}
