import { Module } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { Activities, ActivitiesSchema } from './activities.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { FilesModule } from 'src/files/files.module';
import { PublishActivities, PublishActivitiesSchema } from './publish-activities.schema';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Activities.name, schema: ActivitiesSchema },
            { name: PublishActivities.name, schema: PublishActivitiesSchema },
        ]),
        MulterModule.register({}),
        FilesModule,
        NotificationModule,
    ],
    controllers: [ActivitiesController],
    providers: [ActivitiesService],
})
export class ActivitiesModule {}
