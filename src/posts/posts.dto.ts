import { IsNumber, IsString } from "class-validator";


export class GetPostsDto{

    @IsNumber()
    pageNumber: number

    @IsString()
    userId: string

}

