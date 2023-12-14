import { Injectable } from '@nestjs/common';
import { FilesService } from '../files/files.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Activities } from './activities.schema';
import { ActivitiesDto, GetOnePublishActivitiesDto, GetPublishActivitiesDto } from './activities.dto';
import { GetOnePublishDto, VisiableDto } from 'src/category/category.dto';
import { NOTIFICATION_EVENT, PRIVACY } from 'src/enum/enum';
import { PublishActivities } from './publish-activities.schema';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class ActivitiesService {
    constructor(
        @InjectModel(Activities.name)
        private readonly activitiesModel: Model<Activities>,
        @InjectModel(PublishActivities.name)
        private readonly publishActivitiesModel: Model<PublishActivities>,
        private filesService: FilesService,
        private notificationService: NotificationService,
    ) {}

    async createActivitie({
        activitie,
        files,
    }: {
        activitie: ActivitiesDto;
        files: Array<Express.Multer.File>;
    }): Promise<ActivitiesDto> {
        try {
     
            
            await this.filesService.uploadFiles(files, 'uploads/activities');
            const newCategory = new this.activitiesModel({
                name: activitie.name,
                fileName: activitie.fileName,
            });

            await newCategory.save();
            return newCategory;
        } catch (error) {
            throw new Error(
                'ActivitiesService createActivitie' + error.message,
            );
        }
    }

    async getAllActivities(){
        return await this.activitiesModel.find()
    }

    async deleteActivities(idAct: string) {
        const idActivities = new Types.ObjectId(idAct);
        try {
            const activitiesFile = await this.activitiesModel.findByIdAndDelete({
                _id: idActivities,
            });
            await this.filesService.deleteFile(
                activitiesFile.fileName,
                'uploads/activities',
            );
            return idActivities;
        } catch (error) {
            throw error;
        }
    }

    async visiableActivities({
        id,
        isVisiable,
    }: VisiableDto): Promise<VisiableDto> {
        const activitiesId = new Types.ObjectId(id);
        try {
            await this.activitiesModel.findByIdAndUpdate(
                { _id: activitiesId },
                { isVisiable },
            );
            return { id, isVisiable };
        } catch (error) {
            throw error;
        }
    }

    async addPublishActivities(
        { payload, files }: { payload: {
            privacyPost: PRIVACY 
            title: string 
            text: string
            userId: string
            activitiesId: string
            coordinates: { lat: number; lng: number } 
            startDate: Date 
            userIdentityId: string
        }, files: Array<Express.Multer.File> }
    ) {
        try {

            
            const userId = new Types.ObjectId(payload.userId)
            const activitiesId = new Types.ObjectId(payload.activitiesId)
            const filesName = await this.filesService.uploadFiles(files, 'uploads/publish_activities', false)

            await this.notificationService.sendNotificationBroadcast({
                ownerId: payload.userId,
                ownerIdentityId: payload.userIdentityId,
                title: payload.text,
                name: payload.title,
                fileName: filesName[0],
                event: NOTIFICATION_EVENT.NOTIFICATION_ACTIVITIES
            })

            return await this.publishActivitiesModel.create({
                ...payload, filesName, userId, activitiesId
            })
        } catch (error) {

        }
    }

    async getPublishActivities(body: GetPublishActivitiesDto) {
        const pageSize = 100
        const allPageNumber = Math.ceil((await this.publishActivitiesModel.countDocuments()) / pageSize)
        const activitiesId = new Types.ObjectId(body.activitiesId)

        const skip = (body.pageNumber - 1) * pageSize;

        const publishActivities = await this.publishActivitiesModel
            .find({ activitiesId })
            .skip(skip)
            .limit(pageSize)
            .sort({ createEventDate: -1 })
            .populate({
                path: 'userId',
                select: 'fullName avatarFileName',
            })
            .populate({
                path: 'userIdentityId',
                select: '',
            })
            .populate({
                path: 'activitiesId',
                select: 'name',
            })
            .exec();

        return { publishActivities, allPageNumber };
    }


    async getTenPublishActivities(){
        try {
            const publishServices = await this.publishActivitiesModel
            .find()
            .sort({ createdPublishServiceDate: -1 })
            .populate({
                path: 'userId',
                select: 'fullName avatarFileName email role',
            })
            .populate({
                path: 'userIdentityId',
                populate: {
                    path: 'profession dateBirth',
                },
            })
            .populate({
                path: 'activitiesId',
                select: 'name',
            })

            return publishServices
        } catch (error) {
            throw new Error(error)
        }
    }


    
    async getOnePublishActivities(body: GetOnePublishActivitiesDto){
        try {
            const publishId = new Types.ObjectId(body.publishActivitiesId)

            const publishActivities = await this.publishActivitiesModel
            .findOne({_id:publishId})
            .populate({
                path: 'userId',
                select: 'fullName avatarFileName email role',
            })
            .populate({
                path: 'userIdentityId',
                populate: {
                    path: 'profession',
                },
            })
            .populate({
                path: 'activitiesId',
                select: 'name fileName',
            })

            return publishActivities
        } catch (error) {
            throw new Error(error)
        }
    }
}
