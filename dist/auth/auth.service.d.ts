import { User } from '../user/user.schema';
import { Model } from 'mongoose';
import { AuthDto, ConfirmCodeEmailDTO, EmailDTO, RegistrationDto } from './auth.dto';
import { METHOD_REGISTRATION, METHOD_FORGET_PASSWORD } from 'src/enum/enum';
import { MailService } from 'src/mailer/mail.service';
import { JwtTokenService } from './jwt-auth.service';
import { SmsService } from 'src/sms/sms.service';
export declare class AuthService {
    private userModel;
    private jwtTokenService;
    private mailService;
    private smsService;
    constructor(userModel: Model<User>, jwtTokenService: JwtTokenService, mailService: MailService, smsService: SmsService);
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
    regenereteCodeByEmail({ email, sendMethod }: {
        email: string;
        sendMethod: METHOD_FORGET_PASSWORD;
    }): Promise<void>;
    sendCodeEmailMessage({ email, codeCheck }: {
        email: string;
        codeCheck: number;
    }): Promise<void>;
    sendCodePhoneMessage({ phone, codeCheck }: {
        phone: string;
        codeCheck: number;
    }): Promise<void>;
    confirmAccount({ email, code }: ConfirmCodeEmailDTO): Promise<{
        isCheckedEmail: boolean;
    }>;
    getPhoneNumber(body: EmailDTO): Promise<{
        email: string;
        phone: string;
    }>;
    forgetPassword({ email, code }: ConfirmCodeEmailDTO): Promise<{
        hashPassword: string;
    }>;
    changePassword({ email, oldPassword, hashPassword, newPassword }: {
        email: string;
        oldPassword?: string;
        hashPassword?: string;
        newPassword: string;
    }): Promise<void>;
}
