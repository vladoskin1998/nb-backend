import { Injectable, Type } from '@nestjs/common';
import { PublishPosts } from './publish-posts.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { FilesService } from 'src/files/files.service';
import { NOTIFICATION_EVENT, NOTIFICATION_POST, PRIVACY } from 'src/enum/enum';
import { AddCommentDto, AddMarkPostDto, AddRepostDto, ChangePostPrivacyDto, DeletePostDto, GetMarkPostDto, GetPostDto, GetPostsDto, NotificationPostDto, PostHideDto, UpdatePinPostDto } from './posts.dto';
import { Likes } from 'src/likes/likes.schema';
import { PublishComments } from './publish-comments.schema';
import { UserIdentity } from 'src/user-identity/user-identity.schema';
import { NotificationService } from 'src/notification/notification.service';
import { Repost } from './repost.schema';
import { MarkPost } from './posts-mark.schema';
import { IDUserDto } from 'src/user/user.dto';
import { PostNotification } from './post-notification.schema';
import { User } from 'src/user/user.schema';
import { PostPin } from './post-pin.schema';
import { UserIdDTO } from 'src/notification/notification.dto';
import { PostHide } from './post-hide.schema';

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

        @InjectModel(PostNotification.name)
        private readonly postNotificationModel: Model<PostNotification>,

        @InjectModel(User.name)
        private readonly userModel: Model<User>,

        @InjectModel(PostPin.name)
        private readonly postPinModel: Model<PostPin>,

        @InjectModel(PostHide.name)
        private readonly postHideModel: Model<PostHide>,
        
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

            const hideList = await this.postHideModel.find({ownerId: new Types.ObjectId(userId)})

            console.log(userId,"hideList",hideList);
            
            const hideListRepost =  hideList.filter(item => !Boolean(item?.hideUserId)).map(item => item?.hideRepostId)
            const hideListOwnerPost = hideList.filter(item => !Boolean(item?.hideRepostId)).map(item => item?.hideUserId)

            console.log(hideListRepost, hideListOwnerPost);
            

            if (body?.listPinedPost?.length) {
                const listPinnedPost = body.listPinedPost.map(item => new Types.ObjectId(item))
                allPosts = await this.repostModel.find({ _id: { $in: listPinnedPost } })
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
                    });
            }
            else {
                allPosts = await this.repostModel.find(
                    {
                        $and: [
                             { _id: { $nin: hideListRepost } },
                            { ownerId: { $nin: hideListOwnerPost } },
                        ],
                    }                    
                )
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
                    .exec()
            }

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


                    const isNotificatedComment = await this.postNotificationModel.findOne({
                        $and: [
                            { postId: new Types.ObjectId(post.postId._id) },
                            { userId: body.userId },
                            { typeNotification: NOTIFICATION_POST.COMMENT }
                        ]
                    })

                    const isNotificatedPost = await this.postNotificationModel.findOne({
                        $and: [
                            { postId: new Types.ObjectId(post.postId._id) },
                            { userId: body.userId },
                            { typeNotification: NOTIFICATION_POST.POST }
                        ]
                    })

                    const isPined = await this.postPinModel.findOne({
                        $and: [
                            { repostId: new Types.ObjectId(post._id) },
                            { userId: new Types.ObjectId(body.userId) },
                        ]
                    })
                    return {
                        repostId: post._id,
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
                        isNotificatedComment: Boolean(isNotificatedComment),
                        isNotificatedPost: Boolean(isNotificatedPost),
                        isPined: Boolean(isPined),
                        isPinedPostFlag: Boolean(body?.listPinedPost?.length > 0)
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

            const isNotificatedComment = await this.postNotificationModel.findOne({
                $and: [
                    { postId: new Types.ObjectId(post._id) },
                    { userId: body.userId },
                    { typeNotification: NOTIFICATION_POST.COMMENT }
                ]
            })

            const isNotificatedPost = await this.postNotificationModel.findOne({
                $and: [
                    { postId: new Types.ObjectId(post._id) },
                    { userId: body.userId },
                    { typeNotification: NOTIFICATION_POST.POST }
                ]
            })

            
            const isPined = await this.postPinModel.findOne({
                $and: [
                    { repostId: new Types.ObjectId(post._id) },
                    { userId: new Types.ObjectId(body.userId) },
                ]
            })

            const postWithLike = {
                repostId: post._id,
                ...post.toObject(),
                likeId: post.toObject().likes?._id || '',
                likes: post.likes?.usersId.length || 0,
                isLiked: post.likes?.usersId.includes(body.userId),
                isReposted: Boolean(isReposted),
                isMarked: Boolean(isMarked),
                countComments,
                countReposts,

                isNotificatedComment: Boolean(isNotificatedComment),
                isNotificatedPost: Boolean(isNotificatedPost),
                isPined: Boolean(isPined),

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

    async getPostPin(body: UserIdDTO) {
        try {
            const userId = new Types.ObjectId(body.userId)
            return await this.postPinModel.find({ userId: userId })
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
                coordinates: { lat: number; lng: number },
                deletedFiles?: string[]
                postId?: string
            }, files: Array<Express.Multer.File>
        }
    ) {
        try {

            if (payload?.postId) {

                const { text, title, coordinates, privacyPost } = payload
                const newFilesName = await this.filesService.uploadFiles(files, 'uploads/publish_post', false)
                const postId = new Types.ObjectId(payload?.postId)
                const post = await this.publishPostsModel.findOne({ _id: postId })

                const postFileName = post?.filesName.filter(item => !payload.deletedFiles.includes(item))

                const filesName = [...newFilesName, ...postFileName]
                await this.filesService.deleteFiles(payload?.deletedFiles, 'uploads/publish_post')

                await post.updateOne({
                    text, title, coordinates, filesName, privacyPost
                })
                return
            }

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
                repostedUserId, postId: post._id,
                ownerId: userId
            })

            return post
        } catch (error) {
            throw new error
        }
    }

    async changePostPrivacy(body: ChangePostPrivacyDto) {
        try {
            const postId = new Types.ObjectId(body.postId)
            delete body.postId
            await this.publishPostsModel.updateOne({ _id: postId }, { ...body })
        } catch (error) {
            throw new error
        }
    }

    async updatePostPin(body: UpdatePinPostDto) {
        try {
            const repostId = new Types.ObjectId(body.repostId)
            const userId = new Types.ObjectId(body.userId)
            const isPined = await this.postPinModel.findOne({
                repostId: repostId
            })

            if (isPined) {
                await this.postPinModel.deleteOne({
                    repostId: repostId
                })
                return
            }

            await this.postPinModel.create({ repostId, userId: userId })

        } catch (error) {
            throw new Error(error)
        }
    }

    async addComment(body: AddCommentDto) {
        try {
            const userId = new Types.ObjectId(body.userId)
            const userIdentityId = new Types.ObjectId(body.userIdentityId)
            const likes = (await this.likesModel.create({}))._id
            const postId = new Types.ObjectId(body.postId)

            const rooms = (await this.postNotificationModel.find({ $and: [{ postId }, { typeNotification: NOTIFICATION_POST.COMMENT }] })).map(item => item.userId)
            const { avatarFileName, fullName } = await this.userModel.findOne({ _id: userId })
            await this.notificationService.sendNotification({ rooms, ownerId: body.userId, title: body.text, fileName: avatarFileName, name: fullName, event: NOTIFICATION_EVENT.NOTIFICATION_NEWS })

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

    async updateNotification(body: NotificationPostDto) {
        try {
            const postId = new Types.ObjectId(body.postId)
            const isNotificated = await this.postNotificationModel.findOne({
                $and: [
                    { postId },
                    { userId: body.userId },
                    { typeNotification: body.typeNotification }
                ]
            })

            if (isNotificated) {
                await this.postNotificationModel.deleteOne({
                    $and: [
                        { postId },
                        { userId: body.userId },
                        { typeNotification: body.typeNotification }
                    ]
                })
                return
            }

            await this.postNotificationModel.create({ postId, userId: body.userId, typeNotification: body.typeNotification })

        } catch (error) {
            throw new Error(error)
        }
    }

    async updateRepost(body: AddRepostDto) {
        try {
            const repostedUserId = new Types.ObjectId(body.repostedUserId)
            const postId = new Types.ObjectId(body.postId)

            const isReposted = await this.repostModel.findOne({
                $and: [
                    { repostedUserId },
                    { postId },
                ]
            })

            if (isReposted) {
                await this.repostModel.deleteOne({
                    $and: [
                        { repostedUserId },
                        { postId },
                    ]
                })
                return
            }
            await this.repostModel.create({ repostedUserId, postId, createdRepostDate: new Date() })
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

    async hidePost(body:PostHideDto){
        try {            
            await this.postHideModel.create({
                createdHideDate: new Date(),
                ownerId:  new Types.ObjectId(body.ownerId),
                hideRepostId: body?.hideRepostId ? new Types.ObjectId(body?.hideRepostId) : null,
                hideUserId:body?.hideUserId ? new Types.ObjectId(body?.hideUserId): null

            })
        } catch (error) {
            
        }
    }


    async deletePost(body: DeletePostDto) {
        try {
            const postId = new Types.ObjectId(body.postId)
            const { filesName, likes } = await this.publishPostsModel.findOneAndRemove({ _id: postId })

            await this.repostModel.deleteMany({ postId })
            await this.filesService.deleteFiles(filesName, 'uploads/publish_post')
            await this.likesModel.deleteMany({ _id: new Types.ObjectId(likes) })
            await this.publishCommentsModel.deleteMany({ postId })
            await this.markPostModel.deleteMany({ postId })
            await this.postNotificationModel.deleteMany({ postId })
        } catch (error) {
            throw new error
        }
    }

}
