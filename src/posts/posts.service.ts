import { Injectable } from '@nestjs/common';
import { PublishPosts } from './publish-posts.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { FilesService } from 'src/files/files.service';
import { NOTIFICATION_EVENT, PRIVACY } from 'src/enum/enum';
import { AddCommentDto, AddMarkPostDto, AddRepostDto, GetMarkPostDto, GetPostDto, GetPostsDto } from './posts.dto';
import { Likes } from 'src/likes/likes.schema';
import { PublishComments } from './publish-comments.schema';
import { UserIdentity } from 'src/user-identity/user-identity.schema';
import { NotificationService } from 'src/notification/notification.service';
import { Repost } from './repost.schema';
import { MarkPost } from './posts-mark.schema';
import { IDUserDto } from 'src/user/user.dto';

@Injectable()
export class PostsService {

    constructor(
        @InjectModel(PublishPosts.name)
        private readonly publishPostsModel: Model<PublishPosts>,
        @InjectModel(Likes.name)
        private readonly likesModel: Model<Likes>,
        @InjectModel(PublishComments.name)
        private readonly publishCommentsModel: Model<PublishComments>,

        @InjectModel(Repost.name)
        private readonly repostModel: Model<Repost>,

        @InjectModel(MarkPost.name)
        private readonly markPostModel: Model<MarkPost>,


        @InjectModel(UserIdentity.name)
        private readonly userIdentity: Model<UserIdentity>,
        private filesService: FilesService,
        private notificationService: NotificationService
    ) { }

    async getPosts(body: GetPostsDto) {
        try {
            const pageSize = 50
            const allPageNumber = Math.ceil((await this.publishPostsModel.countDocuments()) / pageSize)
            const userId = body.userId

            const skip = (body.pageNumber - 1) * pageSize;
            let allPosts = []

            allPosts = await this.repostModel.find()
                .skip(skip)
                .limit(pageSize)
                .populate({
                    path: 'postId',
                    populate: {
                        path: 'userId likes',
                        select: 'fullName avatarFileName usersId',
                    },

                })
                .populate({
                    path: 'repostedUserId',
                    select: 'fullName avatarFileName',
                })
                .sort({ createdRepostDate: -1 })

            if (body?.isMarkedOption) {
                const arrMarkPostId = await this.getPostByMark({ marckedUserId: userId })
             
                allPosts = [...new Set(allPosts.map(item => item.postId?._id.toString()))].map(id => allPosts.find(post => post.postId?._id.toString() === id));
                allPosts = allPosts.filter(item => {
                    return arrMarkPostId.includes(item.postId?._id.toString());
                }
                )
            }

            const postWithLikes = await Promise.all(
                allPosts.map(async (post: any) => {
                    const countComments = await this.publishCommentsModel.find({ postId: post.postId?._id }).countDocuments()
                    const countReposts = await this.repostModel.find({ postId: new Types.ObjectId(post.postId?._id) }).countDocuments() - 1
                    const isReposted = await this.repostModel.findOne({ repostedUserId: new Types.ObjectId(body.userId) })
                    const isMarked = await this.markPostModel.findOne({
                        $and: [
                            { marckedUserId: new Types.ObjectId(body.userId) },
                            { postId: new Types.ObjectId(post.postId._id) },
                        ]
                    })

                    return {
                        ...post?.postId?.toObject(),
                        repostedUserId: post?.repostedUserId ? post?.repostedUserId?.toObject() : null,
                        likeId: post?.postId?.toObject().likes?._id || '',
                        likes: post?.postId?.likes?.usersId?.length || 0,
                        isLiked: post?.postId?.likes?.usersId?.includes(userId),
                        countComments,
                        countReposts,
                        createdRepostDate: post.createdRepostDate,
                        isReposted: Boolean(isReposted),
                        isMarked: Boolean(isMarked),

                    }
                }
                )
            )

            return { posts: postWithLikes, allPageNumber };
        } catch (error) {
            throw new Error(error)
        }

    }

    async getOnePost(body: GetPostDto) {
        try {
            const postId = new Types.ObjectId(body.postId)
            let post: any = await this.publishPostsModel
                .findOne({ _id: postId })
                .populate({
                    path: 'userId',
                    select: 'fullName avatarFileName',
                })
                .populate({
                    path: 'likes',
                })
                .exec();

            await post.updateOne({ viewPost: post.viewPost + 1 })

            const countComments = await this.publishCommentsModel.find({ postId }).countDocuments()
            const countReposts = await this.repostModel.find({ postId: new Types.ObjectId(body.postId) }).countDocuments() - 1
            const isReposted = await this.repostModel.findOne({ repostedUserId: new Types.ObjectId(body.userId) })
            const isMarked = await this.markPostModel.findOne({
                $and: [
                    { marckedUserId: new Types.ObjectId(body.userId) },
                    { postId: new Types.ObjectId(postId) },
                ]
            })
            const postWithLike = {
                ...post.toObject(),
                likeId: post.toObject().likes?._id || '',
                likes: post.likes?.usersId.length || 0,
                isLiked: post.likes?.usersId.includes(body.userId),
                isReposted: Boolean(isReposted),
                isMarked: Boolean(isMarked),
                countComments,
                countReposts,
            }

            return {
                post: postWithLike,
            }

        } catch (error) {
            throw new Error(error)
        }
    }

    async getPostByMark(body: GetMarkPostDto) {
        try {
            const marckedUserId = new Types.ObjectId(body.marckedUserId)
            const posts = await this.markPostModel.find({
                marckedUserId
            })


            return posts.map(post => post.postId.toString())
        } catch (error) {

        }
    }

    async getMyComments(body: IDUserDto) {
        try {
            const userId = new Types.ObjectId(body._id)
            const comments = await this.publishCommentsModel.find({ userId })
                .populate({
                    path: 'userId',
                    select: 'fullName avatarFileName',
                })
                .populate({
                    path: 'likes',
                })

            return comments.map((comment: any) => ({
                ...comment.toObject(),
                likeId: comment.toObject().likes?._id || '',
                likes: comment.likes ? comment.likes?.usersId.length : 0,
                isLiked: comment.likes?.usersId.includes(body._id),
            })
            );
        } catch (error) {
            throw new error
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
                    select: 'fullName avatarFileName',
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
            throw new error
        }
    }

    async addPost(
        { payload, files }: {
            payload:
            {
                userIdentityId: string,
                privacyPost: PRIVACY,
                title: string,
                text: string,
                userId: string,
                repostedUserId: string | null,
                coordinates: { lat: number; lng: number }
            }, files: Array<Express.Multer.File>
        }
    ) {
        try {

            let repostedUserId = null
            const userId = new Types.ObjectId(payload.userId)
            const userIdentityId = new Types.ObjectId(payload.userIdentityId)
            const filesName = await this.filesService.uploadFiles(files, 'uploads/publish_post', false)
            const likesId = (await this.likesModel.create({}))._id

            await this.notificationService.sendNotificationBroadcast({
                ownerId: payload.userId,
                ownerIdentityId: payload.userIdentityId,
                title: payload.text,
                fileName: filesName[0],
                name: payload.title,
                event: NOTIFICATION_EVENT.NOTIFICATION_NEWS
            })

            const post = await this.publishPostsModel.create({
                ...payload, filesName, userId, userIdentityId, likes: likesId
            })

            if (repostedUserId) {
                repostedUserId = new Types.ObjectId(payload.repostedUserId)
            }

            await this.repostModel.create({
                repostedUserId, postId: post._id
            })

            return post
        } catch (error) {
            throw new error
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
            throw new error
        }
    }

    async addRepost(body: AddRepostDto) {
        try {
            const repostedUserId = new Types.ObjectId(body.repostedUserId)
            const postId = new Types.ObjectId(body.postId)

            await this.repostModel.create({ repostedUserId, postId })
        } catch (error) {
            throw new error
        }
    }

    async deleteRepost(body: AddRepostDto) {
        try {
            const repostedUserId = new Types.ObjectId(body.repostedUserId)
            const postId = new Types.ObjectId(body.postId)

            await this.repostModel.deleteOne({
                $and: [
                    { repostedUserId },
                    { postId },
                ]
            })
        } catch (error) {
            throw new error
        }
    }

    async addMark(body: AddMarkPostDto) {
        try {

            const marckedUserId = new Types.ObjectId(body.marckedUserId)
            const postId = new Types.ObjectId(body.postId)

            await this.markPostModel.create({ marckedUserId, postId })
        } catch (error) {
            throw new error
        }

    }


    async deleteMark(body: AddMarkPostDto) {
        try {
            const marckedUserId = new Types.ObjectId(body.marckedUserId)
            await this.markPostModel.deleteOne({ marckedUserId })
        } catch (error) {
            throw new error
        }

    }
}
