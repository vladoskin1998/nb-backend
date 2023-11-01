import { User } from '../user/user.schema';
import { Model } from 'mongoose';
import { AuthDto, RegenerateCodeEmailDTO, RegistrationDto } from './auth.dto';
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
    getPhoneNumber(body: RegenerateCodeEmailDTO): Promise<{
        email: string;
        phone: string;
    }>;
}
