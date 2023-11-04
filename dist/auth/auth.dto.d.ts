import { METHOD_FORGET_PASSWORD, METHOD_REGISTRATION, ROLES } from 'src/enum/enum';
export declare class EmailDTO {
    email: string;
}
export declare class AuthDto extends EmailDTO {
    password: string;
    role?: ROLES;
    methodRegistration?: METHOD_REGISTRATION;
}
export declare class RegistrationDto extends AuthDto {
    fullName: string;
}
export declare class ConfirmCodeEmailDTO extends EmailDTO {
    code: number;
}
export declare class RegenerateCodeEmailDTO extends EmailDTO {
    sendMethod: METHOD_FORGET_PASSWORD;
}
export declare class ChangePAsswordDTO extends EmailDTO {
    oldPassword?: string;
    hashPassword?: string;
    newPassword: string;
}
