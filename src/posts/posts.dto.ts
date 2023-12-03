import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";


export class GetPostsDto{

    @IsNumber()
    pageNumber: number

    @IsString()
    userId: string

    @IsOptional()
    @IsBoolean()
    isMarkedOption: boolean

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

export class AddRepostDto {
    @IsString()
    repostedUserId: string

    @IsString()
    postId: string;
}

export class GetMarkPostDto {

    @IsString()
    marckedUserId: string;
}

export class AddMarkPostDto  extends GetMarkPostDto{
    
    @IsString()
    postId: string;
}