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
import { FilesService } from '../files/files.service';
import { Model, Types } from 'mongoose';
import { Activities } from './activities.schema';
import { ActivitiesDto, GetOnePublishActivitiesDto, GetPublishActivitiesDto } from './activities.dto';
import { VisiableDto } from 'src/category/category.dto';
import { PRIVACY } from 'src/enum/enum';
import { PublishActivities } from './publish-activities.schema';
import { NotificationService } from 'src/notification/notification.service';
export declare class ActivitiesService {
    private readonly activitiesModel;
    private readonly publishActivitiesModel;
    private filesService;
    private notificationService;
    constructor(activitiesModel: Model<Activities>, publishActivitiesModel: Model<PublishActivities>, filesService: FilesService, notificationService: NotificationService);
    createActivitie({ activitie, files, }: {
        activitie: ActivitiesDto;
        files: Array<Express.Multer.File>;
    }): Promise<ActivitiesDto>;
    getAllActivities(): Promise<(import("mongoose").Document<unknown, {}, Activities> & Activities & {
        _id: Types.ObjectId;
    })[]>;
    deleteActivities(idAct: string): Promise<Types.ObjectId>;
    visiableActivities({ id, isVisiable, }: VisiableDto): Promise<VisiableDto>;
    addPublishActivities({ payload, files }: {
        payload: {
            privacyPost: PRIVACY;
            title: string;
            text: string;
            userId: string;
            activitiesId: string;
            coordinates: {
                lat: number;
                lng: number;
            };
            startDate: Date;
            userIdentityId: string;
        };
        files: Array<Express.Multer.File>;
    }): Promise<import("mongoose").Document<unknown, {}, PublishActivities> & PublishActivities & {
        _id: Types.ObjectId;
    }>;
    getPublishActivities(body: GetPublishActivitiesDto): Promise<{
        publishActivities: Omit<Omit<Omit<import("mongoose").Document<unknown, {}, PublishActivities> & PublishActivities & {
            _id: Types.ObjectId;
        }, never>, never>, never>[];
        allPageNumber: number;
    }>;
    getTenPublishActivities(): Promise<Omit<Omit<Omit<import("mongoose").Document<unknown, {}, PublishActivities> & PublishActivities & {
        _id: Types.ObjectId;
    }, never>, never>, never>[]>;
    getOnePublishActivities(body: GetOnePublishActivitiesDto): Promise<import("mongoose").Document<unknown, {}, PublishActivities> & PublishActivities & {
        _id: Types.ObjectId;
    }>;
}
