import { EDUCATION, FAMILYSTATUS, ORIENTATION, PRIVACY, ROLES, SEX } from 'src/enum/enum';
declare class Coordinars {
    lat: number;
    lng: number;
}
export declare class GetUsers {
    role: ROLES;
    searchName: string;
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
export declare class ProfileTextInfoDTO {
    readonly _id: string;
    interestZone: number;
    privacy: PRIVACY;
    aboutMe: string;
    dateBirth: Date;
    cityBirth: string;
    sex: SEX | null;
    orientation: ORIENTATION;
    education: EDUCATION | null;
    familyStatus: FAMILYSTATUS | null;
}
export {};
