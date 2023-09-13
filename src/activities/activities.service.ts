import { Injectable } from '@nestjs/common';
import { FilesService } from '../files/files.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Activities } from './activities.schema';
import { ActivitiesDto } from './activities.dto';

@Injectable()
export class ActivitiesService {
    constructor(
        @InjectModel(Activities.name)
        private readonly activitiesModel: Model<Activities>,
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
}
