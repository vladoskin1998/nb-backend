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
import { PRIVACY, SEX, ORIENTATION, EDUCATION, FAMILYSTATUS } from 'src/enum/enum';
import { HydratedDocument, Types } from 'mongoose';
export type UserIdentityDocument = HydratedDocument<UserIdentity>;
export declare class UserIdentity {
    user: Types.ObjectId;
    isLocationVerify: boolean;
    isGotAllProfileInfo: boolean;
    coordinates: {
        lat: number | null;
        lng: number | null;
    };
    city: string | null;
    country: string | null;
    street: string | null;
    houseNumber: string | null;
    createdUserDate: Date;
    blockedUserDate: Date;
    avatarFileName: string | null;
    step: number;
    privacy: PRIVACY;
    aboutMe: string;
    dateBirth: Date | null;
    cityBirth: string | null;
    certificatesFileName: string[] | null;
    sex: SEX | null;
    orientation: ORIENTATION;
    education: EDUCATION | null;
    studySchool: string;
    familyStatus: FAMILYSTATUS | null;
    nationality: {
        _id: string | number;
        title: string;
    }[] | [];
    profession: Types.ObjectId[] | null;
    interests: Types.ObjectId[] | null;
    skills: Types.ObjectId[] | null;
}
export declare const UserIdentitySchema: import("mongoose").Schema<UserIdentity, import("mongoose").Model<UserIdentity, any, any, any, import("mongoose").Document<unknown, any, UserIdentity> & UserIdentity & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserIdentity, import("mongoose").Document<unknown, {}, UserIdentity> & UserIdentity & {
    _id: Types.ObjectId;
}>;
