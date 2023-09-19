import { ROLES } from 'src/enum/enum';
declare class Coordinars {
    lat: number;
    lng: number;
}
export declare class GetUserByRoleDto {
    role: ROLES;
}
export declare class IDUserDto {
    readonly _id: string;
}
export declare class LocationDto {
    readonly _id: string;
    readonly city: string;
    readonly country: string;
    readonly street: string;
    readonly houseNumber: string;
    coordinates: Coordinars;
}
export {};
