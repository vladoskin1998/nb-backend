import { Type } from 'class-transformer';
import { IsString, IsArray, ValidateNested, IsBoolean, IsObject, IsNumber, IsEnum } from 'class-validator';
import { ROLES } from 'src/enum/enum';

class Coordinars
{
    @IsNumber()
    lat: number;

    @IsNumber()
    lng: number;
}

export class GetUserByRoleDto
{
    @IsEnum(ROLES)
    role: ROLES = ROLES.ALLUSERS;
}

export class IDUserDto {
    @IsString()
    readonly _id: string;
}



export class LocationDto {
    @IsString()
    readonly _id: string;

    @IsString()
    readonly city: string;

    @IsString()
    readonly country: string;

    @IsString()
    readonly street: string;
    
    @IsString()
    readonly houseNumber: string;

    @ValidateNested()
    @Type(() => Coordinars)
    coordinates: Coordinars;
}
