import { METHOD_REGISTRATION, ROLES } from 'src/enum/enum';
export declare class AuthDto {
    email: string;
    password: string;
    role?: ROLES;
    methodRegistration?: METHOD_REGISTRATION;
}
export declare class RegistrationDto extends AuthDto {
    fullName: string;
}
export declare class ConfirmCodeEmailDTO {
    email: string;
    code: number;
}
export declare class RegenerateCodeEmailDTO {
    email: string;
}
