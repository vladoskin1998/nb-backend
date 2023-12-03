export declare class GetPostsDto {
    pageNumber: number;
    userId: string;
    isMarkedOption: boolean;
}
export declare class GetPostDto {
    postId: string;
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
export declare class GetMarkPostDto {
    marckedUserId: string;
}
export declare class AddMarkPostDto extends GetMarkPostDto {
    postId: string;
}
