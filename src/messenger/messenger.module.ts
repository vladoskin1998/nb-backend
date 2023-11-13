import { Module } from '@nestjs/common';
import { MessengerService } from './messenger.service';
import { MessengerController } from './messenger.controller';
import { MessengerGateway } from './messenger.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Chats, ChatsSchema } from './chats.schema';
import { UserModule } from 'src/user/user.module';
import { Message, MessageSchema } from './message.schema';
import { User, UserSchema } from 'src/user/user.schema';
import { UserIdentity, UserIdentitySchema } from 'src/user-identity/user-identity.schema';
import { FilesModule } from 'src/files/files.module';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Chats.name, schema: ChatsSchema },
            { name: Message.name, schema: MessageSchema },
            { name: User.name, schema: UserSchema },
            { name: UserIdentity.name, schema: UserIdentitySchema },
        ]),
        UserModule,
        FilesModule,
        NotificationModule,
    ],
    controllers: [MessengerController],
    providers: [MessengerService, MessengerGateway]
})
export class MessengerModule { }
