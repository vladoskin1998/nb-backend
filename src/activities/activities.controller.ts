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
import { ActivitiesDto } from './activities.dto';

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
}
