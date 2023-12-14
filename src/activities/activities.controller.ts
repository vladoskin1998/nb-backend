import {
    Body,
    Controller,
    Get,
    Post,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ActivitiesDto, GetOnePublishActivitiesDto, GetPublishActivitiesDto } from './activities.dto';
import { GetOnePublishDto, IDDto, VisiableDto } from 'src/category/category.dto';

@Controller('activities')
export class ActivitiesController {
    constructor(private readonly activitiesService: ActivitiesService) {}

    @Post('add-activitie')
    @UseInterceptors(FilesInterceptor('files'))
    async addActivitie(
        @UploadedFiles() files: Array<Express.Multer.File>,
        @Body() body,
    ) {
        const {
            activitie,
        }: {
            activitie: ActivitiesDto;
        } = JSON.parse(body.payload);

        return await this.activitiesService.createActivitie({ activitie, files });
    }

    @Get('all-activities')
    async allActivities() {
        return await this.activitiesService.getAllActivities();
    }
    
    @Post('delete-activities')
    async deleteCategory(@Body() { id }: IDDto) {
        return await this.activitiesService.deleteActivities(id);
    }

    @Post('visiable-activities')
    async visiableCategory(@Body() dto: VisiableDto) {
        return await this.activitiesService.visiableActivities(dto);
    }

    @Post('add-publish-activities')
    @UseInterceptors(FilesInterceptor('files'))
    async addPost(
        @Body() body,
        @UploadedFiles() files: Array<Express.Multer.File> | null,
    ) {
       const payload = JSON.parse(body.payload);
       return await this.activitiesService.addPublishActivities({files, payload})
    }

    @Post('get-publish-activities')
    async getPublishActivities(@Body() body: GetPublishActivitiesDto) {

        return await this.activitiesService.getPublishActivities(body)
    }

    @Post('get-ten-publish-activities')
    async getTenPosts() {
        return await this.activitiesService.getTenPublishActivities()
    }

    @Post('get-one-publish-activities')
    async getOnePublishService(@Body() body: GetOnePublishActivitiesDto) {
        return await this.activitiesService.getOnePublishActivities(body)
    }


}
