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
import { QUALITYENUM } from 'src/enum/enum';
import { UserProfession } from './user-profession.schema';
import { Model, Types } from 'mongoose';
import { UserInterests } from './user-interests.schema';
import { UserSkills } from './user-skills.schema';
import { LocationDto, ProfileSelectDTO, ProfileTextInfoDTO } from './user-identity.dto';
import { UserIdentity } from './user-identity.schema';
import { FilesService } from 'src/files/files.service';
export declare class UserIdentityService {
    private readonly userIdentity;
    private readonly userProfession;
    private readonly userInterests;
    private readonly userSkills;
    private readonly filesService;
    constructor(userIdentity: Model<UserIdentity>, userProfession: Model<UserProfession>, userInterests: Model<UserInterests>, userSkills: Model<UserSkills>, filesService: FilesService);
    getIdentityInforamation(_id: string): Promise<(import("mongoose").Document<unknown, {}, UserIdentity> & UserIdentity & {
        _id: Types.ObjectId;
    }) | {
        profession: (import("mongoose").Document<unknown, {}, UserProfession> & UserProfession & {
            _id: Types.ObjectId;
        })[];
        interests: (import("mongoose").Document<unknown, {}, UserInterests> & UserInterests & {
            _id: Types.ObjectId;
        })[];
        skills: (import("mongoose").Document<unknown, {}, UserSkills> & UserSkills & {
            _id: Types.ObjectId;
        })[];
        userIdentityId: Types.ObjectId;
        user: Types.ObjectId;
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
        nationality: [] | {
            _id: string | number;
            title: string;
        }[];
        _id: Types.ObjectId;
    }>;
    changeLocation(body: LocationDto): Promise<{
        isLocationVerify: boolean;
    }>;
    profileUploadAvatar(file: Express.Multer.File, _id: string): Promise<{
        avatarFileName: string;
    }>;
    profileUploadCertificates(files: Array<Express.Multer.File>, _id: string): Promise<{
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
    }>;
    profileIdentity(body: ProfileSelectDTO): Promise<{
        [x: string]: import("./user-identity.dto").ProfessionDto[];
    }>;
    getCountriesList(country: string): Promise<{
        _id: string;
        title: string;
    }[]>;
    getPopularCountriesList(): Promise<{
        _id: string;
        title: string;
    }[]>;
    private getModelByQuality;
    getSkillProfInterest(searchValues: string, quality: QUALITYENUM): Promise<any>;
    getPopularSkillProfInterest(quality: QUALITYENUM): Promise<(import("mongoose").Document<unknown, {}, UserProfession> & UserProfession & {
        _id: Types.ObjectId;
    })[]>;
    checkCreateSkillProfInterest(body: ProfileSelectDTO): Promise<{
        title: string;
        _id: string;
    }[]>;
}
