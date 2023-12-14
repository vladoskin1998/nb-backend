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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { MessengerService } from './messenger.service';
import { ChatIDDto, ListChatDto, NewChatDto, ReadMessageIDDto } from './messenger.dto';
export declare class MessengerController {
    private readonly messengerService;
    constructor(messengerService: MessengerService);
    openChat(dto: NewChatDto): Promise<{
        participants: {
            userId: import("mongoose").Types.ObjectId;
        }[];
        chatId: import("mongoose").Types.ObjectId;
        isSupport: boolean;
    }>;
    newChat(dto: NewChatDto): Promise<void>;
    listChat(dto: ListChatDto): Promise<{
        participants: {
            userId: import("mongoose").Types.ObjectId;
        }[];
        chatId: import("mongoose").Types.ObjectId;
        lastMessage: import("./message.schema").Message & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
        isSupport: boolean;
        groupName: string;
    }[]>;
    getChatHistory(dto: ChatIDDto): Promise<(import("mongoose").Document<unknown, {}, import("./message.schema").Message> & import("./message.schema").Message & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    messageFile(file: Express.Multer.File): Promise<string>;
    readMessages(dto: ReadMessageIDDto): Promise<void>;
}
