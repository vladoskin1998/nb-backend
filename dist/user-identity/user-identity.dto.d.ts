import { EDUCATION, FAMILYSTATUS, ORIENTATION, PRIVACY, QUALITYENUM, SEX } from "src/enum/enum";
import { IDUserDto } from "src/user/user.dto";
export declare class ProfessionDto {
    _id: string;
    title: string;
}
export declare class ProfileSelectDTO extends IDUserDto {
    readonly value: ProfessionDto[];
    readonly quality: QUALITYENUM;
}
declare class Coordinars {
    readonly lat: number;
    readonly lng: number;
}
export declare class LocationDto {
    _id: string;
    readonly city: string;
    readonly country: string;
    readonly street: string;
    readonly houseNumber: string;
    readonly coordinates: Coordinars;
}
export declare class ProfileTextInfoDTO {
    _id: string;
    readonly interestZone?: number;
    readonly privacy?: PRIVACY;
    readonly aboutMe?: string;
    readonly dateBirth?: Date;
    readonly cityBirth?: string;
    readonly sex?: SEX | null;
    readonly orientation?: ORIENTATION;
    readonly education?: EDUCATION | null;
    readonly studySchool?: string;
    readonly familyStatus?: FAMILYSTATUS | null;
    readonly nationality?: {
        _id: string | number;
        title: string;
    }[] | [];
    readonly profession?: string[] | null;
    readonly interests?: string[] | null;
    readonly skills?: string[] | null;
    readonly certificatesFileName?: string[] | null;
    readonly lastStepChangeProfile?: string;
}
export {};
