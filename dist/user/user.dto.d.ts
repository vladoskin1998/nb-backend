import { ROLES } from 'src/enum/enum';
export declare class IDUserDto {
    readonly _id: string;
}
export declare class GetUsers extends IDUserDto {
    role: ROLES;
    searchName: string;
}
export declare class UserTextInfoDTO {
    readonly _id: string;
    fullName?: string;
    email?: string;
    role?: ROLES;
    phone?: string;
}
export declare class ClosestUserDto {
    role: ROLES;
    myLat: number;
    myLng: number;
}
