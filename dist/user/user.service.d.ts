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
import { User } from './user.schema';
import { Model, Types } from 'mongoose';
import { AddFriendDto, ClosestUserDto, IDUserDto, UserTextInfoDTO } from './user.dto';
import { ROLES } from 'src/enum/enum';
import { JwtTokenService } from 'src/auth/jwt-auth.service';
import { UserIdentity } from 'src/user-identity/user-identity.schema';
import { Friends } from './friends.schema';
import { FilesService } from 'src/files/files.service';
import { UserIdDTO } from 'src/notification/notification.dto';
export declare class UserService {
    private readonly userModel;
    private userIdentityModel;
    private friendsModel;
    private readonly filesService;
    private readonly jwtTokenService;
    constructor(userModel: Model<User>, userIdentityModel: Model<UserIdentity>, friendsModel: Model<Friends>, filesService: FilesService, jwtTokenService: JwtTokenService);
    getOneUserById(dto: UserIdDTO): Promise<import("mongoose").Document<unknown, {}, User> & User & {
        _id: Types.ObjectId;
    }>;
    getUsers({ _id, role, searchName }: {
        _id: string;
        role: ROLES;
        searchName: string;
    }): Promise<User[]>;
    deleteUser(_id: string): Promise<void>;
    blockUser(_id: string): Promise<void>;
    userTextInfo(body: UserTextInfoDTO): Promise<{
        _id: string;
        fullName?: string;
        email?: string;
        role?: ROLES;
        phone?: string;
        avatarFileName?: string;
    }>;
    checkUsersExist(userIds: string[]): Promise<{
        _id: Types.ObjectId;
    }[]>;
    getClosestUserByRole(body: ClosestUserDto): Promise<any>;
    getMyFriends(body: IDUserDto): Promise<any>;
    checkToMyFriend(body: AddFriendDto): Promise<boolean>;
    addToMyFriend(body: AddFriendDto): Promise<Omit<import("mongoose").Document<unknown, {}, Friends> & Friends & {
        _id: Types.ObjectId;
    }, never>>;
    deleteMyFriend(body: AddFriendDto): Promise<import("mongoose").Document<unknown, {}, Friends> & Friends & {
        _id: Types.ObjectId;
    }>;
    profileUploadAvatar(file: Express.Multer.File, _id: string): Promise<{
        avatarFileName: string;
    }>;
}
