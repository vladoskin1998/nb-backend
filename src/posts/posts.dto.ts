import { IsNumber } from "class-validator";


export class GetPostsDto{

    @IsNumber()
    pageNumber: number

}

