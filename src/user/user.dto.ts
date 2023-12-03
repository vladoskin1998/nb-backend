import { Type } from 'class-transformer';
import { IsString, IsArray, ValidateNested, IsBoolean, IsObject, IsNumber, IsEnum, IsNotEmpty, isNumber, IsOptional, IsDate, Validate, IsMongoId, IsEmail, IsEmpty } from 'class-validator';
import { Types } from 'mongoose';
import { EDUCATION, FAMILYSTATUS, ORIENTATION, PRIVACY, QUALITYENUM, ROLES, SEX } from 'src/enum/enum';
import { isDateOrString, isValidNationality } from 'src/utils/utils';

export class IDUserDto {
    @IsNotEmpty()
    @IsString()
    readonly _id: string;
}

export class AddFriendDto extends IDUserDto{
    @IsNotEmpty()
    @IsString()
    readonly friendId: string;
}

export class GetUsers extends IDUserDto{
    @IsEnum(ROLES)
    role: ROLES = ROLES.ALLUSERS;

    @IsString()
    searchName: string
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
    @IsString()
    phone?: string

    @IsOptional()
    @IsString()
    avatarFileName?: string
}

export class ClosestUserDto{

    @IsEnum(ROLES)
    role: ROLES;

    @IsNumber()
    myLat: number

    @IsNumber()
    myLng: number
}

