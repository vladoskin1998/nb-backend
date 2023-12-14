import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ActivitiesDto {

    @IsNotEmpty()
    @IsString()
    readonly fileName: string;

    @IsNotEmpty()
    @IsString()
    readonly name: string;
}



export class GetPublishActivitiesDto {

    @IsNumber()
    readonly pageNumber: number

    @IsString()    
    readonly activitiesId : string
}


export class GetOnePublishActivitiesDto {
    @IsNotEmpty()
    @IsString()
    readonly publishActivitiesId: string;
}