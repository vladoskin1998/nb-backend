import { AuthService } from './auth.service';
import { AuthDto, ConfirmCodeEmailDTO, RegenerateCodeEmailDTO, RegistrationDto } from './auth.dto';
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
    confirmCodeByEmail(body: ConfirmCodeEmailDTO): Promise<{
        isCheckedEmail: boolean;
    }>;
}
