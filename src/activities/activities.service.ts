import { Injectable } from '@nestjs/common';
import { FilesService } from '../files/files.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Activities } from './activities.schema';
import { ActivitiesDto } from './activities.dto';
import { VisiableDto } from 'src/category/category.dto';

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
}
