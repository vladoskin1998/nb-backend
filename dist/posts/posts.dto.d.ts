export declare class GetPostsDto {
    pageNumber: number;
    userId: string;
}
export declare class GetPostDto {
    postId: string;
    userId: string;
}
export declare class AddCommentDto extends GetPostDto {
    userIdentityId: string;
    text: string;
}
