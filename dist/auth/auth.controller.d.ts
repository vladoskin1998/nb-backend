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
import { AuthService } from './auth.service';
import { AuthDto, ChangePAsswordDTO, ConfirmCodeEmailDTO, EmailDTO, RegenerateCodeEmailDTO, RegistrationDto } from './auth.dto';
import { Response, Request } from 'express';
import { ConfigService } from '@nestjs/config';
export declare class AuthController {
    private readonly authService;
    private configService;
    constructor(authService: AuthService, configService: ConfigService);
    googleAuth(): Promise<any>;
    googleAuthRedirect(req: Request, res: Response): Promise<void>;
    facebookLogin(): Promise<any>;
    facebookLoginRedirect(req: Request, res: Response): Promise<any>;
    registration(authDto: RegistrationDto, res: Response): Promise<{
        user: import("../user/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
        accessToken: string;
        refreshToken: string;
    }>;
    login(authDto: AuthDto, res: Response): Promise<{
        user: import("../user/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
        accessToken: string;
        refreshToken: string;
    }>;
    refresh(req: Request, res: Response): Promise<{
        user: import("mongoose").Document<unknown, {}, import("../user/user.schema").User> & import("../user/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    logout(req: Request, res: Response): Promise<string>;
    regenereteCodeByEmail(body: RegenerateCodeEmailDTO): Promise<void>;
    confirmAccount(body: ConfirmCodeEmailDTO): Promise<{
        isCheckedEmail: boolean;
    }>;
    getPhoneNumber(body: EmailDTO): Promise<{
        email: string;
        phone: string;
    }>;
    forgetPassword(body: ConfirmCodeEmailDTO): Promise<{
        hashPassword: string;
    }>;
    changePassword(body: ChangePAsswordDTO): Promise<void>;
}
