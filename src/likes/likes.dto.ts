import { IsNumber, IsString } from "class-validator";


export class LikesUpdateDTO{

    @IsString()
    likeId: number

    @IsString()
    userId: string

}

