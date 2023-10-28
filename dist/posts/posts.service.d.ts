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
import { GetPostsDto } from './posts.dto';
import { Likes } from 'src/likes/likes.schema';
export declare class PostsService {
    private readonly publishPostsModel;
    private readonly likesModel;
    private filesService;
    constructor(publishPostsModel: Model<PublishPosts>, likesModel: Model<Likes>, filesService: FilesService);
    getPosts(body: GetPostsDto): Promise<{
        posts: any;
        allPageNumber: number;
    }>;
    addPost({ payload, files }: {
        payload: {
            userIdentityId: string;
            privacyPost: PRIVACY;
            title: string;
            text: string;
            userId: string;
            coordinates: {
                lat: number;
                lng: number;
            };
        };
        files: Array<Express.Multer.File>;
    }): Promise<import("mongoose").Document<unknown, {}, PublishPosts> & PublishPosts & {
        _id: Types.ObjectId;
    }>;
}
