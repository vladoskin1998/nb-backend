import { IsNumber, IsString } from "class-validator";


export class UserIdDTO{

    @IsString()
    userId: string

}



