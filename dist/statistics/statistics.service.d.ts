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
import { Model } from 'mongoose';
import { Activities } from 'src/activities/activities.schema';
import { Category } from 'src/category/category.schema';
import { Message } from 'src/messenger/message.schema';
import { UserIdentity } from 'src/user-identity/user-identity.schema';
import { User } from 'src/user/user.schema';
import { Statistic } from './statistic.schema';
export declare class StatisticsService {
    private activitiesModel;
    private categoryModel;
    private userModel;
    private messageModel;
    private userIdentityModel;
    private statisticModel;
    constructor(activitiesModel: Model<Activities>, categoryModel: Model<Category>, userModel: Model<User>, messageModel: Model<Message>, userIdentityModel: Model<UserIdentity>, statisticModel: Model<Statistic>);
    countDocumentsDb(): Promise<{
        countServices: number;
        countActivities: number;
        countUsers: number;
        countMessages: number;
    }>;
    countUser(): Promise<{
        totalUsers: number;
        newUsers: number;
        activeUsers: number;
        nonActiveUsers: number;
    }>;
    getTenDocumentUsers(): Promise<(import("mongoose").Document<unknown, {}, Statistic> & Statistic & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    saveStatistic(): Promise<void>;
}
