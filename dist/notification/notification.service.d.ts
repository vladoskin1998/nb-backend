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
import { NotificationGateway } from './notification.gateway';
import { NOTIFICATION_EVENT } from 'src/enum/enum';
import { Model } from 'mongoose';
import { Notification } from './notification.schema';
import { UserIdDTO } from './notification.dto';
export declare class NotificationService {
    private readonly notificationGateway;
    private readonly notificationModel;
    constructor(notificationGateway: NotificationGateway, notificationModel: Model<Notification>);
    sendNotification(props: {
        rooms: string[];
        ownerId: string;
        title: string;
        fileName: string;
        name: string;
        event: NOTIFICATION_EVENT;
    }): Promise<void>;
    addRoomsNotification(props: {
        offlineUserRooms: string[];
        ownerId: string;
        title: string;
        fileName: string;
        name: string;
        event: NOTIFICATION_EVENT;
    }): Promise<void>;
    sendNotificationBroadcast(props: {
        ownerId: string;
        title: string;
        fileName: string;
        name: string;
        event: NOTIFICATION_EVENT;
    }): Promise<void>;
    getUserNotification(body: UserIdDTO): Promise<(import("mongoose").Document<unknown, {}, Notification> & Notification & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
