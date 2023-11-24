import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationGateway } from './notification.gateway';
import { NotificationSchema, Notification } from './notification.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationController } from './notification.controller';
import { UserIdentityModule } from 'src/user-identity/user-identity.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Notification.name, schema: NotificationSchema },
        ]),
        UserIdentityModule
    ],
    controllers: [NotificationController],
    providers: [NotificationGateway, NotificationService],
    exports: [NotificationGateway, NotificationService]
})
export class NotificationModule { }
