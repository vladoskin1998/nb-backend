import { Type } from 'class-transformer';
import { IsString, IsArray, ValidateNested, IsBoolean, IsObject, IsNumber, IsEnum, IsNotEmpty, isNumber, IsOptional, IsDate, Validate } from 'class-validator';
import { EDUCATION, FAMILYSTATUS, ORIENTATION, PRIVACY, ROLES, SEX } from 'src/enum/enum';
import { isDateOrString } from 'src/utils/utils';

class Coordinars {
    @IsNotEmpty()
    @IsNumber()
    lat: number;

    @IsNotEmpty()
    @IsNumber()
    lng: number;
}

export class GetUsers {
    @IsEnum(ROLES)
    role: ROLES = ROLES.ALLUSERS;

    @IsString()
    searchName: string
}

export class IDUserDto {
    @IsNotEmpty()
    @IsString()
    readonly _id: string;
}



export class LocationDto {
    @IsNotEmpty()
    @IsString()
    readonly _id: string;

    @IsNotEmpty()
    @IsString()
    readonly city: string;

    @IsString()
    readonly country: string;

    @IsNotEmpty()
    @IsString()
    readonly street: string;

    @IsNotEmpty()
    @IsString()
    readonly houseNumber: string;

    @ValidateNested()
    @Type(() => Coordinars)
    coordinates: Coordinars;
}



export class ProfileTextInfoDTO {

    @IsNotEmpty()
    @IsString()
    readonly _id: string;

    @IsOptional()
    @IsNumber()
    interestZone: number;

    @IsOptional()
    @IsEnum(PRIVACY)
    privacy: PRIVACY;

    @IsOptional()
    @IsString()
    aboutMe: string;

    @IsOptional()
    @Validate(isDateOrString)
    dateBirth: Date

    @IsOptional()
    @IsString()
    cityBirth: string

    @IsOptional()
    @IsEnum(SEX)
    sex: SEX | null;

    @IsOptional()
    @IsEnum(ORIENTATION)
    orientation: ORIENTATION

    @IsOptional()
    @IsEnum(ORIENTATION)
    education: EDUCATION | null;

    @IsOptional()
    @IsEnum(FAMILYSTATUS)
    familyStatus: FAMILYSTATUS | null;
}