import { IsNotEmpty, IsString } from 'class-validator';

export class ActivitiesDto {

    @IsNotEmpty()
    @IsString()
    readonly fileName: string;

    @IsNotEmpty()
    @IsString()
    readonly name: string;
}
