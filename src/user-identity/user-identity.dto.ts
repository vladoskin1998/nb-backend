import { Type } from "class-transformer";
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Validate, ValidateNested } from "class-validator";
import { EDUCATION, FAMILYSTATUS, ORIENTATION, PRIVACY, QUALITYENUM, ROLES, SEX } from "src/enum/enum";
import { IDUserDto } from "src/user/user.dto";
import { isDateOrString, isValidNationality } from "src/utils/utils";

export class ProfessionDto {
    @IsString()
    _id: string;

    @IsString()
    title: string;
    
}

export class ProfileSelectDTO extends IDUserDto{
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProfessionDto)
    readonly value:  ProfessionDto[];

    @IsEnum(QUALITYENUM)
    readonly quality: QUALITYENUM;
}


class Coordinars {
    @IsNotEmpty()
    @IsNumber()
    readonly lat: number;

    @IsNotEmpty()
    @IsNumber()
    readonly lng: number;
}


export class LocationDto {
    @IsNotEmpty()
    @IsString()
     _id: string;

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
    readonly coordinates: Coordinars;
}



export class ProfileTextInfoDTO {

    @IsNotEmpty()
    @IsString()
    _id: string;

    @IsOptional()
    @IsNumber()
    readonly interestZone?: number;

    @IsOptional()
    @IsEnum(PRIVACY)
    readonly privacy?: PRIVACY;

    @IsOptional()
    @IsString()
    readonly aboutMe?: string;

    @IsOptional()
    @Validate(isDateOrString)
    readonly dateBirth?: Date

    @IsOptional()
    @IsString()
    readonly cityBirth?: string

    @IsOptional()
    @IsEnum(SEX)
    readonly sex?: SEX | null;

    @IsOptional()
    @IsEnum(ORIENTATION)
    readonly orientation?: ORIENTATION

    @IsOptional()
    @IsEnum(EDUCATION)
    readonly education?: EDUCATION | null;
    
    @IsOptional()
    @IsString()
    readonly studySchool?: string;

    @IsOptional()
    @IsEnum(FAMILYSTATUS)
    readonly familyStatus?: FAMILYSTATUS | null;

    @IsOptional()
    @IsArray()
    @Validate(isValidNationality)
    readonly nationality?: { _id: string | number; title: string }[] | [];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    readonly profession?: string[] | null;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    readonly interests?: string[] | null;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    readonly skills?: string[] | null;

    
    @IsOptional()
    @IsArray()
    readonly certificatesFileName?: string[] | null;
}

