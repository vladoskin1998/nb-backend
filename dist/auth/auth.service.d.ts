import { User } from '../user/user.schema';
import { Model } from 'mongoose';
import { AuthDto } from './auth.dto';
import { ROLES, METHOD_REGISTRATION } from 'src/enum/enum';
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
        user: {
            email: string;
            role: ROLES;
            id: any;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    fbLogin(req: any): Promise<"No user from google" | {
        message: string;
        user: any;
    }>;
    registration({ email, password, methodRegistration }: AuthDto): Promise<{
        user: {
            email: string;
            role: ROLES;
            id: any;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    login({ email, password, methodRegistration }: AuthDto): Promise<{
        user: {
            email: string;
            role: ROLES;
            id: any;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    logout(refreshToken: string): Promise<import("mongodb").DeleteResult>;
    refresh(refreshToken: string): Promise<{
        user: {
            email: string;
            role: ROLES;
            id: any;
        };
        accessToken: string;
        refreshToken: string;
    }>;
}
