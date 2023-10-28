import { Injectable } from '@nestjs/common';
import { PublishPosts } from './publish-posts.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { FilesService } from 'src/files/files.service';
import { PRIVACY } from 'src/enum/enum';
import { GetPostsDto } from './posts.dto';
import { Likes } from 'src/likes/likes.schema';

@Injectable()
export class PostsService {


    constructor(
        @InjectModel(PublishPosts.name)
        private readonly publishPostsModel: Model<PublishPosts>,
        @InjectModel(Likes.name)
        private readonly likesModel: Model<Likes>,
        private filesService: FilesService
    ) { }

    async getPosts(body: GetPostsDto) {
        const pageSize = 50
        const allPageNumber = Math.ceil((await this.publishPostsModel.countDocuments()) / pageSize)
        const userId = body.userId

        const skip = (body.pageNumber - 1) * pageSize;
        const posts: any = await this.publishPostsModel
            .find()
            .skip(skip)
            .limit(pageSize)
            .sort({ createdPostDate: -1 })
            .populate({
                path: 'userId',
                select: 'fullName',
            })
            .populate({
                path: 'userIdentityId',
                select: 'avatarFileName',
            })
            .populate({
                path: 'likes',
            })
            .exec();

        const postWithLikes = posts.map((post: any) => ({
            ...post.toObject(),
            likeId: post.toObject().likes?._id || '',
            likes: post.likes ? post.likes?.usersId.length : 0,
            isLiked: post.likes?.usersId.includes(userId),
        })
        );



        return { posts: postWithLikes, allPageNumber };
    }

    async addPost(
        { payload, files }: { payload: { userIdentityId: string, privacyPost: PRIVACY, title: string, text: string, userId: string, coordinates: { lat: number; lng: number } }, files: Array<Express.Multer.File> }
    ) {
        try {
            const userId = new Types.ObjectId(payload.userId)
            const userIdentityId = new Types.ObjectId(payload.userIdentityId)
            const filesName = await this.filesService.uploadFiles(files, 'uploads/publish_post', false)
            const likesId = (await this.likesModel.create({}))._id
            return await this.publishPostsModel.create({
                ...payload, filesName, userId, userIdentityId, likes: likesId
            })
        } catch (error) {

        }
    }
}
