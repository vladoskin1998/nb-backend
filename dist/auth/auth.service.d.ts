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
import { User } from '../user/user.schema';
import { Model } from 'mongoose';
import { AuthDto, RegistrationDto } from './auth.dto';
import { METHOD_REGISTRATION } from 'src/enum/enum';
import { MailService } from 'src/mailer/mail.service';
import { JwtTokenService } from './jwt-auth.service';
export declare class AuthService {
    private userModel;
    private jwtTokenService;
    private mailService;
    constructor(userModel: Model<User>, jwtTokenService: JwtTokenService, mailService: MailService);
    messengerLogin(user: {
        email: string;
        methodRegistration: METHOD_REGISTRATION;
    }): Promise<{
        user: User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
        accessToken: string;
        refreshToken: string;
    }>;
    registration({ email, password, methodRegistration, fullName }: RegistrationDto): Promise<{
        user: User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
        accessToken: string;
        refreshToken: string;
    }>;
    login({ email, password, methodRegistration }: AuthDto): Promise<{
        user: User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
        accessToken: string;
        refreshToken: string;
    }>;
    logout(refreshToken: string): Promise<import("mongodb").DeleteResult>;
    refresh(refreshToken: string): Promise<{
        user: import("mongoose").Document<unknown, {}, User> & User & {
            _id: import("mongoose").Types.ObjectId;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    regenereteCodeByEmail({ email }: {
        email: string;
    }): Promise<void>;
    confirmCodeByEmail({ email, code }: {
        email: any;
        code: any;
    }): Promise<{
        isCheckedEmail: boolean;
    }>;
}
