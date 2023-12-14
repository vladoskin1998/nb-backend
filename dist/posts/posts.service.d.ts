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
/// <reference types="mongoose/types/inferschematype" />
import { PublishPosts } from './publish-posts.schema';
import { Model, Types } from 'mongoose';
import { FilesService } from 'src/files/files.service';
import { PRIVACY } from 'src/enum/enum';
import { AddCommentDto, AddMarkPostDto, AddRepostDto, ChangePostPrivacyDto, DeletePostDto, GetMarkPostDto, GetPostDto, GetPostsDto, NotificationPostDto, PostHideDto, UpdatePinPostDto } from './posts.dto';
import { Likes } from 'src/likes/likes.schema';
import { PublishComments } from './publish-comments.schema';
import { NotificationService } from 'src/notification/notification.service';
import { Repost } from './repost.schema';
import { MarkPost } from './posts-mark.schema';
import { IDUserDto } from 'src/user/user.dto';
import { PostNotification } from './post-notification.schema';
import { User } from 'src/user/user.schema';
import { PostPin } from './post-pin.schema';
import { UserIdDTO } from 'src/notification/notification.dto';
import { PostHide } from './post-hide.schema';
export declare class PostsService {
    private readonly publishPostsModel;
    private readonly likesModel;
    private readonly publishCommentsModel;
    private readonly repostModel;
    private readonly markPostModel;
    private readonly postNotificationModel;
    private readonly userModel;
    private readonly postPinModel;
    private readonly postHideModel;
    private filesService;
    private notificationService;
    constructor(publishPostsModel: Model<PublishPosts>, likesModel: Model<Likes>, publishCommentsModel: Model<PublishComments>, repostModel: Model<Repost>, markPostModel: Model<MarkPost>, postNotificationModel: Model<PostNotification>, userModel: Model<User>, postPinModel: Model<PostPin>, postHideModel: Model<PostHide>, filesService: FilesService, notificationService: NotificationService);
    getPosts(body: GetPostsDto): Promise<{
        posts: any[];
        allPageNumber: number;
    }>;
    getOnePost(body: GetPostDto): Promise<{
        post: any;
    }>;
    getPostByMark(body: GetMarkPostDto): Promise<string[]>;
    getMyComments(body: IDUserDto): Promise<any[]>;
    getComments(body: GetPostDto): Promise<{
        comments: any;
        countComments: number;
    }>;
    getPostPin(body: UserIdDTO): Promise<(import("mongoose").Document<unknown, {}, PostPin> & PostPin & {
        _id: Types.ObjectId;
    })[]>;
    addPost({ payload, files }: {
        payload: {
            userIdentityId: string;
            privacyPost: PRIVACY;
            title: string;
            text: string;
            userId: string;
            repostedUserId: string | null;
            coordinates: {
                lat: number;
                lng: number;
            };
            deletedFiles?: string[];
            postId?: string;
        };
        files: Array<Express.Multer.File>;
    }): Promise<import("mongoose").Document<unknown, {}, PublishPosts> & PublishPosts & {
        _id: Types.ObjectId;
    }>;
    changePostPrivacy(body: ChangePostPrivacyDto): Promise<void>;
    updatePostPin(body: UpdatePinPostDto): Promise<void>;
    addComment(body: AddCommentDto): Promise<import("mongoose").Document<unknown, {}, PublishComments> & PublishComments & {
        _id: Types.ObjectId;
    }>;
    updateNotification(body: NotificationPostDto): Promise<void>;
    updateRepost(body: AddRepostDto): Promise<void>;
    addMark(body: AddMarkPostDto): Promise<void>;
    deleteMark(body: AddMarkPostDto): Promise<void>;
    hidePost(body: PostHideDto): Promise<void>;
    deletePost(body: DeletePostDto): Promise<void>;
}
