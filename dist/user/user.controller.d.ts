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
import { UserService } from './user.service';
import { AddFriendDto, ClosestUserDto, GetUsers, IDUserDto, UserTextInfoDTO } from './user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUsersByRole(body: GetUsers): Promise<import("./user.schema").User[]>;
    deleteUser(body: IDUserDto): Promise<void>;
    blockUser(body: IDUserDto): Promise<void>;
    userTextInfo(body: UserTextInfoDTO): Promise<{
        _id: string;
        fullName?: string;
        email?: string;
        role?: import("../enum/enum").ROLES;
        phone?: string;
    }>;
    getClosestUserByRole(body: ClosestUserDto): Promise<any>;
    getMyFriends(body: IDUserDto): Promise<Omit<import("mongoose").Document<unknown, {}, import("./friends.schema").Friends> & import("./friends.schema").Friends & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    checkToMyFriend(body: AddFriendDto): Promise<boolean>;
    addToMyFriend(body: AddFriendDto): Promise<Omit<import("mongoose").Document<unknown, {}, import("./friends.schema").Friends> & import("./friends.schema").Friends & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    deleteMyFriend(body: AddFriendDto): Promise<import("mongoose").Document<unknown, {}, import("./friends.schema").Friends> & import("./friends.schema").Friends & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
