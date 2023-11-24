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
import { UserIdentityService } from './user-identity.service';
import { GetUserIdentityDto, LocationDto, ProfileSelectDTO, ProfileTextInfoDTO } from './user-identity.dto';
export declare class UserIdentityController {
    private readonly userIdentityService;
    constructor(userIdentityService: UserIdentityService);
    getIdentityInforamation(body: GetUserIdentityDto): Promise<(import("mongoose").Document<unknown, {}, import("./user-identity.schema").UserIdentity> & import("./user-identity.schema").UserIdentity & {
        _id: import("mongoose").Types.ObjectId;
    }) | {
        profession: (import("mongoose").Document<unknown, {}, import("./user-profession.schema").UserProfession> & import("./user-profession.schema").UserProfession & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        interests: (import("mongoose").Document<unknown, {}, import("./user-interests.schema").UserInterests> & import("./user-interests.schema").UserInterests & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        skills: (import("mongoose").Document<unknown, {}, import("./user-skills.schema").UserSkills> & import("./user-skills.schema").UserSkills & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        userIdentityId: import("mongoose").Types.ObjectId;
        user: import("mongoose").Types.ObjectId;
        isLocationVerify: boolean;
        isGotAllProfileInfo: boolean;
        coordinates: {
            lat: number;
            lng: number;
        };
        city: string;
        country: string;
        street: string;
        houseNumber: string;
        createdUserDate: Date;
        blockedUserDate: Date;
        avatarFileName: string;
        step: number;
        privacy: import("src/enum/enum").PRIVACY;
        aboutMe: string;
        dateBirth: Date;
        cityBirth: string;
        certificatesFileName: string[];
        sex: import("src/enum/enum").SEX;
        orientation: import("src/enum/enum").ORIENTATION;
        education: import("src/enum/enum").EDUCATION;
        studySchool: string;
        familyStatus: import("src/enum/enum").FAMILYSTATUS;
        nationality: {
            _id: string | number;
            title: string;
        }[] | [];
        isAddedServices: boolean;
        isAddedPost: boolean;
        isExploreDone: boolean;
        lastStepChangeProfile: string;
        online: import("src/enum/enum").ONLINEOFFLINE;
        _id: import("mongoose").Types.ObjectId;
    }>;
    profileUploadAvatar(body: any, file: Express.Multer.File): Promise<{
        avatarFileName: string;
    }>;
    profileUploadCertificates(body: any, files: Array<Express.Multer.File>): Promise<{
        certificatesFileName: string[];
    }>;
    profileTextInfo(body: ProfileTextInfoDTO): Promise<{
        _id: string;
        interestZone?: number;
        privacy?: import("src/enum/enum").PRIVACY;
        aboutMe?: string;
        dateBirth?: Date;
        cityBirth?: string;
        sex?: import("src/enum/enum").SEX;
        orientation?: import("src/enum/enum").ORIENTATION;
        education?: import("src/enum/enum").EDUCATION;
        studySchool?: string;
        familyStatus?: import("src/enum/enum").FAMILYSTATUS;
        nationality?: [] | {
            _id: string | number;
            title: string;
        }[];
        profession?: string[];
        interests?: string[];
        skills?: string[];
        certificatesFileName?: string[];
        isAddedServices?: boolean;
        isAddedPost?: boolean;
        isExploreDone?: boolean;
        lastStepChangeProfile?: string;
        online?: import("src/enum/enum").ONLINEOFFLINE;
    }>;
    profileIdentity(body: ProfileSelectDTO): Promise<{
        [x: string]: import("./user-identity.dto").ProfessionDto[];
    }>;
    logout(body: LocationDto): Promise<{
        isLocationVerify: boolean;
    }>;
    getCountriesList(body: {
        searchValue: string;
    }): Promise<{
        _id: string;
        title: string;
    }[]>;
    getPopularCountriesList(): Promise<{
        _id: string;
        title: string;
    }[]>;
    getProfessionList(body: {
        searchValue: string;
    }): Promise<any>;
    getPopularProfessionList(): Promise<(import("mongoose").Document<unknown, {}, import("./user-profession.schema").UserProfession> & import("./user-profession.schema").UserProfession & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getInterestsList(body: {
        searchValue: string;
    }): Promise<any>;
    getPopularInterestsList(): Promise<(import("mongoose").Document<unknown, {}, import("./user-profession.schema").UserProfession> & import("./user-profession.schema").UserProfession & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getSkillsList(body: {
        searchValue: string;
    }): Promise<any>;
    getPopularSkillsList(): Promise<(import("mongoose").Document<unknown, {}, import("./user-profession.schema").UserProfession> & import("./user-profession.schema").UserProfession & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
