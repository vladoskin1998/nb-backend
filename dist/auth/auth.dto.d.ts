import { METHOD_REGISTRATION, ROLES } from 'src/enum/enum';
export declare class AuthDto {
    email: string;
    password: string;
    role?: ROLES;
    methodRegistration?: METHOD_REGISTRATION;
}
