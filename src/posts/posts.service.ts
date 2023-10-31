import { Injectable } from '@nestjs/common';
import { PublishPosts } from './publish-posts.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { FilesService } from 'src/files/files.service';
import { PRIVACY } from 'src/enum/enum';
import { AddCommentDto, GetPostDto, GetPostsDto } from './posts.dto';
import { Likes } from 'src/likes/likes.schema';
import { PublishComments } from './publish-comments.schema';

@Injectable()
export class PostsService {

    constructor(
        @InjectModel(PublishPosts.name)
        private readonly publishPostsModel: Model<PublishPosts>,
        @InjectModel(Likes.name)
        private readonly likesModel: Model<Likes>,
        @InjectModel(PublishComments.name)
        private readonly publishCommentsModel: Model<PublishComments>,
        private filesService: FilesService
    ) { }

    async getPosts(body: GetPostsDto) {
        try {
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

            const postWithLikes = await Promise.all(
                posts.map(async (post: any) => {
                    const countComments = await this.publishCommentsModel.find({ postId:post._id }).countDocuments()
                    return {
                        ...post.toObject(),
                        likeId: post.toObject().likes?._id || '',
                        likes: post.likes ? post.likes?.usersId.length : 0,
                        isLiked: post.likes?.usersId.includes(userId),
                        countComments
                    }
                }
                )
            )

            return { posts: postWithLikes, allPageNumber };
        } catch (error) {
            throw new Error(error)
        }

    }

    async getPost(body: GetPostDto) {
        try {
            const postId = new Types.ObjectId(body.postId)
            let post:any = await this.publishPostsModel
                .findOne({ _id: postId })
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

            await post.updateOne({viewPost: post.viewPost+1})

            const postWithLike = {
                ...post.toObject(),
                likeId: post.toObject().likes?._id || '',
                likes: post.likes ? post.likes?.usersId.length : 0,
                isLiked: post.likes?.usersId.includes(body.userId),
            }

            return {
                post: postWithLike,
            }

        } catch (error) {

        }
    }

    async getComments(body: GetPostDto) {
        try {
            const postId = new Types.ObjectId(body.postId)
            const countComments = await this.publishCommentsModel.find({ postId }).countDocuments()
            const comments: any = await this.publishCommentsModel
                .find({ postId })
                .sort({ createdDateComment: -1 })
                .limit(10)
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

            const commentWithLikes = comments.map((comment: any) => ({
                ...comment.toObject(),
                likeId: comment.toObject().likes?._id || '',
                likes: comment.likes ? comment.likes?.usersId.length : 0,
                isLiked: comment.likes?.usersId.includes(body.userId),
            })
            );

            return { comments: commentWithLikes, countComments }
        } catch (error) {

        }
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

    async addComment(body: AddCommentDto) {
        try {
            const userId = new Types.ObjectId(body.userId)
            const userIdentityId = new Types.ObjectId(body.userIdentityId)
            const likes = (await this.likesModel.create({}))._id
            const postId = new Types.ObjectId(body.postId)
            return await this.publishCommentsModel.create({
                userId,
                userIdentityId,
                likes,
                postId,
                text: body.text
            })
        } catch (error) {

        }
    }
}
