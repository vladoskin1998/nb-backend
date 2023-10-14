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
import { JwtService } from '@nestjs/jwt';
import { ROLES } from 'src/enum/enum';
import { Authentication } from './auth.schema';
import { Model, Types } from 'mongoose';
export declare class JwtTokenService {
    private authModel;
    private readonly jwtService;
    constructor(authModel: Model<Authentication>, jwtService: JwtService);
    generateTokens(payload: {
        email: string;
        role: ROLES;
        id: string;
    }): {
        accessToken: string;
        refreshToken: string;
    };
    validateAccessToken(token: any): any;
    validateRefreshToken(token: any): any;
    saveToken(userId: any, refreshToken: any): Promise<import("mongoose").Document<unknown, {}, Authentication> & Authentication & {
        _id: Types.ObjectId;
    }>;
    removeToken(refreshToken: any): Promise<import("mongodb").DeleteResult>;
    findToken(refreshToken: any): Promise<import("mongoose").Document<unknown, {}, Authentication> & Authentication & {
        _id: Types.ObjectId;
    }>;
    deleteToken(_id: string | Types.ObjectId): Promise<void>;
}
