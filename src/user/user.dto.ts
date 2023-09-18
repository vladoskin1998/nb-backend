import { IsString, IsArray, ValidateNested, IsBoolean, IsObject } from 'class-validator';

export class LocationDto {
    @IsString()
    readonly id: string;

    @IsString()
    readonly city: string;

    @IsString()
    readonly country: string;

    @IsString()
    readonly street: string;
    
    @IsString()
    readonly houseNumber: string;

    @IsObject()
    @ValidateNested()
    coordinars: {
        lat: number | null;
        lng: number | null;
    };
}
