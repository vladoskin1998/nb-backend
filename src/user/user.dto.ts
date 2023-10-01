import { Type } from 'class-transformer';
import { IsString, IsArray, ValidateNested, IsBoolean, IsObject, IsNumber, IsEnum, IsNotEmpty, isNumber, IsOptional, IsDate, Validate, IsMongoId, IsEmail, IsEmpty } from 'class-validator';
import { Types } from 'mongoose';
import { EDUCATION, FAMILYSTATUS, ORIENTATION, PRIVACY, QUALITYENUM, ROLES, SEX } from 'src/enum/enum';
import { isDateOrString, isValidNationality } from 'src/utils/utils';


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



export class UserTextInfoDTO {
    @IsNotEmpty()
    @IsString()
    readonly _id: string;

    @IsOptional()
    @IsString()
    fullName?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsEnum(ROLES)
    role?: ROLES;

    @IsOptional()
    @IsEmpty()
    @IsString()
    phone?: string
}




export class ChangePasswordDTO {
    @IsNotEmpty()
    @IsString()
    readonly _id: string;

    @IsString()
    password: string;

    @IsString()
    newPassword1: string;

    @IsOptional()
    @IsString()
    newPassword2: string;

}


