import { NOTIFICATION_POST, PRIVACY } from "src/enum/enum";
export declare class GetPostsDto {
    pageNumber: number;
    userId: string;
    isMarkedOption: boolean;
    listPinedPost: string[];
}
export declare class GetPostDto {
    postId: string;
    userId: string;
}
export declare class NotificationPostDto extends GetPostDto {
    typeNotification: NOTIFICATION_POST;
}
export declare class UpdatePinPostDto {
    repostId: string;
    userId: string;
}
export declare class AddCommentDto extends GetPostDto {
    userIdentityId: string;
    text: string;
}
export declare class AddRepostDto {
    repostedUserId: string;
    postId: string;
}
export declare class ChangePostPrivacyDto {
    privacyPost: PRIVACY;
    privacyComment: PRIVACY;
    postId: string;
}
export declare class GetMarkPostDto {
    marckedUserId: string;
}
export declare class AddMarkPostDto extends GetMarkPostDto {
    postId: string;
}
export declare class DeletePostDto {
    postId: string;
}
export declare class PostHideDto {
    ownerId: string;
    hideUserId: string;
    hideRepostId: string;
}
