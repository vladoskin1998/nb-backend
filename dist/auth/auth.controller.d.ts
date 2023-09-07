import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
import { Response, Request } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    googleAuth(): Promise<any>;
    googleAuthRedirect(req: Request, res: Response): Promise<void>;
    facebookLogin(): Promise<any>;
    facebookLoginRedirect(req: Request, res: Response): Promise<any>;
    registration(authDto: AuthDto, res: Response): Promise<{
        user: {
            email: string;
            role: import("../enum/enum").ROLES;
            id: any;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    login(authDto: AuthDto, res: Response): Promise<{
        user: {
            email: string;
            role: import("../enum/enum").ROLES;
            id: any;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    refresh(req: Request, res: Response): Promise<{
        user: {
            email: string;
            role: import("../enum/enum").ROLES;
            id: any;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    logout(req: Request, res: Response): Promise<string>;
}
