import { Type } from 'class-transformer';
import { IsString, IsArray, ValidateNested, IsBoolean, IsObject, IsNumber, IsEnum, IsNotEmpty } from 'class-validator';
import { ROLES } from 'src/enum/enum';

class Coordinars
{
    @IsNotEmpty()
    @IsNumber()
    lat: number;

    @IsNotEmpty()
    @IsNumber()
    lng: number;
}

export class GetUsers
{
    @IsEnum(ROLES)
    role: ROLES = ROLES.ALLUSERS;

    @IsString()
    searchName:string
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
