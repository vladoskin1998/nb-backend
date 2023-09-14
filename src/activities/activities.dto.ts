import { IsString } from 'class-validator';

export class ActivitiesDto {
    @IsString()
    readonly fileName: string;

    @IsString()
    readonly name: string;
}
