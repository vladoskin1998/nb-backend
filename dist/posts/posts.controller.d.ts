/// <reference types="multer" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { PostsService } from './posts.service';
import { AddCommentDto, AddMarkPostDto, AddRepostDto, GetMarkPostDto, GetPostDto, GetPostsDto } from './posts.dto';
import { IDUserDto } from 'src/user/user.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    getPosts(body: GetPostsDto): Promise<{
        posts: any[];
        allPageNumber: number;
    }>;
    getPost(body: GetPostDto): Promise<{
        post: any;
    }>;
    getPostByMark(body: GetMarkPostDto): Promise<string[]>;
    getComments(body: GetPostDto): Promise<{
        comments: any;
        countComments: number;
    }>;
    getMyComments(body: IDUserDto): Promise<any[]>;
    addPost(body: any, files: Array<Express.Multer.File> | null): Promise<import("mongoose").Document<unknown, {}, import("./publish-posts.schema").PublishPosts> & import("./publish-posts.schema").PublishPosts & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    addComment(body: AddCommentDto): Promise<import("mongoose").Document<unknown, {}, import("./publish-comments.schema").PublishComments> & import("./publish-comments.schema").PublishComments & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    addRepost(body: AddRepostDto): Promise<void>;
    deleteRepost(body: AddRepostDto): Promise<void>;
    addMark(body: AddMarkPostDto): Promise<void>;
    deleteMark(body: AddMarkPostDto): Promise<void>;
}
