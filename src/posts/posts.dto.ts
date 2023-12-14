import { IsArray, IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { NOTIFICATION_POST, PRIVACY } from "src/enum/enum";


export class GetPostsDto {

    @IsNumber()
    pageNumber: number

    @IsString()
    userId: string

    @IsOptional()
    @IsBoolean()
    isMarkedOption: boolean

    @IsOptional()
    @IsArray()
    listPinedPost: string[]

}

export class GetPostDto {

    @IsString()
    postId: string

    @IsString()
    userId: string

}

export class NotificationPostDto extends GetPostDto{

    @IsEnum(NOTIFICATION_POST)
    typeNotification: NOTIFICATION_POST

}


export class UpdatePinPostDto {

    @IsString()
    repostId: string

    @IsString()
    userId: string

}



export class AddCommentDto extends GetPostDto {
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

export class ChangePostPrivacyDto {
    @IsOptional()
    @IsEnum(PRIVACY)
    privacyPost: PRIVACY;

    @IsOptional()
    @IsEnum(PRIVACY)
    privacyComment: PRIVACY;

    @IsString()
    postId: string;
}

export class GetMarkPostDto {

    @IsString()
    marckedUserId: string;
}

export class AddMarkPostDto extends GetMarkPostDto {

    @IsString()
    postId: string;
}

export class DeletePostDto {
    
    @IsString()
    postId: string;
}


export class PostHideDto {

    @IsString()
    ownerId: string;
    
    @IsOptional()
    @IsString()
    hideUserId: string;

    @IsOptional()
    @IsString()
    hideRepostId: string;

}