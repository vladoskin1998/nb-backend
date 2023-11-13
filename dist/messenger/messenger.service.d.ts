/// <reference types="multer" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { AddNewMessageDto, ChatIDDto, ListChatDto, NewChatDto } from './messenger.dto';
import { Chats } from './chats.schema';
import { Model, Types } from 'mongoose';
import { Message } from './message.schema';
import { User } from 'src/user/user.schema';
import { UserIdentity } from 'src/user-identity/user-identity.schema';
import { FilesService } from 'src/files/files.service';
import { NotificationService } from 'src/notification/notification.service';
export declare class MessengerService {
    private userIdentityModel;
    private userModel;
    private chatsModel;
    private messageModel;
    private filesService;
    private notificationService;
    constructor(userIdentityModel: Model<UserIdentity>, userModel: Model<User>, chatsModel: Model<Chats>, messageModel: Model<Message>, filesService: FilesService, notificationService: NotificationService);
    openChat(dto: NewChatDto): Promise<{
        participants: {
            userId: string;
            avatarFileName: string;
            fullName: string;
        }[];
        chatId: string | Types.ObjectId;
        isSupport: boolean;
    }>;
    listChat(dto: ListChatDto): Promise<{
        participants: {
            userId: string;
            avatarFileName: string;
            fullName: string;
        }[];
        chatId: Types.ObjectId;
        lastMessage: Message & {
            _id: Types.ObjectId;
        } & Required<{
            _id: Types.ObjectId;
        }>;
        isSupport: boolean;
    }[]>;
    getChatHistory(dto: ChatIDDto): Promise<(import("mongoose").Document<unknown, {}, Message> & Message & {
        _id: Types.ObjectId;
    })[]>;
    addMessage(payload: AddNewMessageDto): Promise<void>;
    fileMessage(file: Express.Multer.File): Promise<string>;
}
