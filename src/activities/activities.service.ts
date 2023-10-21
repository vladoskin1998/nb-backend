import { Injectable } from '@nestjs/common';
import { FilesService } from '../files/files.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Activities } from './activities.schema';
import { ActivitiesDto } from './activities.dto';
import { VisiableDto } from 'src/category/category.dto';
import { PRIVACY } from 'src/enum/enum';
import { PublishActivities } from './publish-activities.schema';

@Injectable()
export class ActivitiesService {
    constructor(
        @InjectModel(Activities.name)
        private readonly activitiesModel: Model<Activities>,
        @InjectModel(PublishActivities.name)
        private readonly publishActivities: Model<PublishActivities>,
        private filesService: FilesService,
    ) {}

    async createActivitie({
        activitie,
        files,
    }: {
        activitie: ActivitiesDto;
        files: Array<Express.Multer.File>;
    }): Promise<ActivitiesDto> {
        try {
            console.log(files);
            
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
        }, files: Array<Express.Multer.File> }
    ) {
        try {
            console.log(payload);
            
            const userId = new Types.ObjectId(payload.userId)
            const activitiesId = new Types.ObjectId(payload.activitiesId)
            const filesName = await this.filesService.uploadFiles(files, 'uploads/publish_activities', false)
            return await this.publishActivities.create({
                ...payload, filesName, userId, activitiesId
            })
        } catch (error) {

        }
    }
}
