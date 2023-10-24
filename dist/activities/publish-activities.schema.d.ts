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
import { HydratedDocument, Types } from 'mongoose';
import { PRIVACY } from 'src/enum/enum';
export type PublishActivitiesDocument = HydratedDocument<PublishActivities>;
export declare class PublishActivities {
    userId: Types.ObjectId;
    userIdentityId: Types.ObjectId;
    activitiesId: Types.ObjectId;
    title: string;
    text: string;
    filesName: string[];
    coordinates: {
        lat: number | null;
        lng: number | null;
    };
    privacyEvent: PRIVACY;
    startDate: Date | null;
    createEventDate: Date | null;
}
export declare const PublishActivitiesSchema: import("mongoose").Schema<PublishActivities, import("mongoose").Model<PublishActivities, any, any, any, import("mongoose").Document<unknown, any, PublishActivities> & PublishActivities & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PublishActivities, import("mongoose").Document<unknown, {}, PublishActivities> & PublishActivities & {
    _id: Types.ObjectId;
}>;
