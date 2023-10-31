import { IsNumber, IsString } from "class-validator";


export class GetPostsDto{

    @IsNumber()
    pageNumber: number

    @IsString()
    userId: string

}

export class GetPostDto{
    
    @IsString()
    postId: string

    @IsString()
    userId: string

}

export class AddCommentDto extends GetPostDto{
    @IsString()
    userIdentityId: string

    @IsString()
    text: string;
}