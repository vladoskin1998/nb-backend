import { ROLES } from 'src/enum/enum';
export declare class GetUsers {
    role: ROLES;
    searchName: string;
}
export declare class IDUserDto {
    readonly _id: string;
}
export declare class UserTextInfoDTO {
    readonly _id: string;
    fullName?: string;
    email?: string;
    role?: ROLES;
    phone?: string;
}
export declare class ChangePasswordDTO {
    readonly _id: string;
    password: string;
    newPassword1: string;
    newPassword2: string;
}
