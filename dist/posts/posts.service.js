"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const publish_posts_schema_1 = require("./publish-posts.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const files_service_1 = require("../files/files.service");
const enum_1 = require("../enum/enum");
const likes_schema_1 = require("../likes/likes.schema");
const publish_comments_schema_1 = require("./publish-comments.schema");
const user_identity_schema_1 = require("../user-identity/user-identity.schema");
const notification_service_1 = require("../notification/notification.service");
const repost_schema_1 = require("./repost.schema");
const posts_mark_schema_1 = require("./posts-mark.schema");
let PostsService = class PostsService {
    constructor(publishPostsModel, likesModel, publishCommentsModel, repostModel, markPostModel, userIdentity, filesService, notificationService) {
        this.publishPostsModel = publishPostsModel;
        this.likesModel = likesModel;
        this.publishCommentsModel = publishCommentsModel;
        this.repostModel = repostModel;
        this.markPostModel = markPostModel;
        this.userIdentity = userIdentity;
        this.filesService = filesService;
        this.notificationService = notificationService;
    }
    async getPosts(body) {
        try {
            const pageSize = 50;
            const allPageNumber = Math.ceil((await this.publishPostsModel.countDocuments()) / pageSize);
            const userId = body.userId;
            const skip = (body.pageNumber - 1) * pageSize;
            let allPosts = [];
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
                .sort({ createdRepostDate: -1 });
            if (body === null || body === void 0 ? void 0 : body.isMarkedOption) {
                const arrMarkPostId = await this.getPostByMark({ marckedUserId: userId });
                allPosts = [...new Set(allPosts.map(item => { var _a; return (_a = item.postId) === null || _a === void 0 ? void 0 : _a._id.toString(); }))].map(id => allPosts.find(post => { var _a; return ((_a = post.postId) === null || _a === void 0 ? void 0 : _a._id.toString()) === id; }));
                allPosts = allPosts.filter(item => {
                    var _a;
                    return arrMarkPostId.includes((_a = item.postId) === null || _a === void 0 ? void 0 : _a._id.toString());
                });
            }
            const postWithLikes = await Promise.all(allPosts.map(async (post) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
                const countComments = await this.publishCommentsModel.find({ postId: (_a = post.postId) === null || _a === void 0 ? void 0 : _a._id }).countDocuments();
                const countReposts = await this.repostModel.find({ postId: new mongoose_2.Types.ObjectId((_b = post.postId) === null || _b === void 0 ? void 0 : _b._id) }).countDocuments() - 1;
                const isReposted = await this.repostModel.findOne({ repostedUserId: new mongoose_2.Types.ObjectId(body.userId) });
                const isMarked = await this.markPostModel.findOne({
                    $and: [
                        { marckedUserId: new mongoose_2.Types.ObjectId(body.userId) },
                        { postId: new mongoose_2.Types.ObjectId(post.postId._id) },
                    ]
                });
                return Object.assign(Object.assign({}, (_c = post === null || post === void 0 ? void 0 : post.postId) === null || _c === void 0 ? void 0 : _c.toObject()), { repostedUserId: (post === null || post === void 0 ? void 0 : post.repostedUserId) ? (_d = post === null || post === void 0 ? void 0 : post.repostedUserId) === null || _d === void 0 ? void 0 : _d.toObject() : null, likeId: ((_f = (_e = post === null || post === void 0 ? void 0 : post.postId) === null || _e === void 0 ? void 0 : _e.toObject().likes) === null || _f === void 0 ? void 0 : _f._id) || '', likes: ((_j = (_h = (_g = post === null || post === void 0 ? void 0 : post.postId) === null || _g === void 0 ? void 0 : _g.likes) === null || _h === void 0 ? void 0 : _h.usersId) === null || _j === void 0 ? void 0 : _j.length) || 0, isLiked: (_m = (_l = (_k = post === null || post === void 0 ? void 0 : post.postId) === null || _k === void 0 ? void 0 : _k.likes) === null || _l === void 0 ? void 0 : _l.usersId) === null || _m === void 0 ? void 0 : _m.includes(userId), countComments,
                    countReposts, createdRepostDate: post.createdRepostDate, isReposted: Boolean(isReposted), isMarked: Boolean(isMarked) });
            }));
            return { posts: postWithLikes, allPageNumber };
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getOnePost(body) {
        var _a, _b, _c;
        try {
            const postId = new mongoose_2.Types.ObjectId(body.postId);
            let post = await this.publishPostsModel
                .findOne({ _id: postId })
                .populate({
                path: 'userId',
                select: 'fullName avatarFileName',
            })
                .populate({
                path: 'likes',
            })
                .exec();
            await post.updateOne({ viewPost: post.viewPost + 1 });
            const countComments = await this.publishCommentsModel.find({ postId }).countDocuments();
            const countReposts = await this.repostModel.find({ postId: new mongoose_2.Types.ObjectId(body.postId) }).countDocuments() - 1;
            const isReposted = await this.repostModel.findOne({ repostedUserId: new mongoose_2.Types.ObjectId(body.userId) });
            const isMarked = await this.markPostModel.findOne({
                $and: [
                    { marckedUserId: new mongoose_2.Types.ObjectId(body.userId) },
                    { postId: new mongoose_2.Types.ObjectId(postId) },
                ]
            });
            const postWithLike = Object.assign(Object.assign({}, post.toObject()), { likeId: ((_a = post.toObject().likes) === null || _a === void 0 ? void 0 : _a._id) || '', likes: ((_b = post.likes) === null || _b === void 0 ? void 0 : _b.usersId.length) || 0, isLiked: (_c = post.likes) === null || _c === void 0 ? void 0 : _c.usersId.includes(body.userId), isReposted: Boolean(isReposted), isMarked: Boolean(isMarked), countComments,
                countReposts });
            return {
                post: postWithLike,
            };
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getPostByMark(body) {
        try {
            const marckedUserId = new mongoose_2.Types.ObjectId(body.marckedUserId);
            const posts = await this.markPostModel.find({
                marckedUserId
            });
            return posts.map(post => post.postId.toString());
        }
        catch (error) {
        }
    }
    async getMyComments(body) {
        try {
            const userId = new mongoose_2.Types.ObjectId(body._id);
            const comments = await this.publishCommentsModel.find({ userId })
                .populate({
                path: 'userId',
                select: 'fullName avatarFileName',
            })
                .populate({
                path: 'likes',
            });
            return comments.map((comment) => {
                var _a, _b, _c;
                return (Object.assign(Object.assign({}, comment.toObject()), { likeId: ((_a = comment.toObject().likes) === null || _a === void 0 ? void 0 : _a._id) || '', likes: comment.likes ? (_b = comment.likes) === null || _b === void 0 ? void 0 : _b.usersId.length : 0, isLiked: (_c = comment.likes) === null || _c === void 0 ? void 0 : _c.usersId.includes(body._id) }));
            });
        }
        catch (error) {
            throw new error;
        }
    }
    async getComments(body) {
        try {
            const postId = new mongoose_2.Types.ObjectId(body.postId);
            const countComments = await this.publishCommentsModel.find({ postId }).countDocuments();
            const comments = await this.publishCommentsModel
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
            const commentWithLikes = comments.map((comment) => {
                var _a, _b, _c;
                return (Object.assign(Object.assign({}, comment.toObject()), { likeId: ((_a = comment.toObject().likes) === null || _a === void 0 ? void 0 : _a._id) || '', likes: comment.likes ? (_b = comment.likes) === null || _b === void 0 ? void 0 : _b.usersId.length : 0, isLiked: (_c = comment.likes) === null || _c === void 0 ? void 0 : _c.usersId.includes(body.userId) }));
            });
            return { comments: commentWithLikes, countComments };
        }
        catch (error) {
            throw new error;
        }
    }
    async addPost({ payload, files }) {
        try {
            let repostedUserId = null;
            const userId = new mongoose_2.Types.ObjectId(payload.userId);
            const userIdentityId = new mongoose_2.Types.ObjectId(payload.userIdentityId);
            const filesName = await this.filesService.uploadFiles(files, 'uploads/publish_post', false);
            const likesId = (await this.likesModel.create({}))._id;
            await this.notificationService.sendNotificationBroadcast({
                ownerId: payload.userId,
                ownerIdentityId: payload.userIdentityId,
                title: payload.text,
                fileName: filesName[0],
                name: payload.title,
                event: enum_1.NOTIFICATION_EVENT.NOTIFICATION_NEWS
            });
            const post = await this.publishPostsModel.create(Object.assign(Object.assign({}, payload), { filesName, userId, userIdentityId, likes: likesId }));
            if (repostedUserId) {
                repostedUserId = new mongoose_2.Types.ObjectId(payload.repostedUserId);
            }
            await this.repostModel.create({
                repostedUserId, postId: post._id
            });
            return post;
        }
        catch (error) {
            throw new error;
        }
    }
    async addComment(body) {
        try {
            const userId = new mongoose_2.Types.ObjectId(body.userId);
            const userIdentityId = new mongoose_2.Types.ObjectId(body.userIdentityId);
            const likes = (await this.likesModel.create({}))._id;
            const postId = new mongoose_2.Types.ObjectId(body.postId);
            return await this.publishCommentsModel.create({
                userId,
                userIdentityId,
                likes,
                postId,
                text: body.text
            });
        }
        catch (error) {
            throw new error;
        }
    }
    async addRepost(body) {
        try {
            const repostedUserId = new mongoose_2.Types.ObjectId(body.repostedUserId);
            const postId = new mongoose_2.Types.ObjectId(body.postId);
            await this.repostModel.create({ repostedUserId, postId });
        }
        catch (error) {
            throw new error;
        }
    }
    async deleteRepost(body) {
        try {
            const repostedUserId = new mongoose_2.Types.ObjectId(body.repostedUserId);
            const postId = new mongoose_2.Types.ObjectId(body.postId);
            await this.repostModel.deleteOne({
                $and: [
                    { repostedUserId },
                    { postId },
                ]
            });
        }
        catch (error) {
            throw new error;
        }
    }
    async addMark(body) {
        try {
            const marckedUserId = new mongoose_2.Types.ObjectId(body.marckedUserId);
            const postId = new mongoose_2.Types.ObjectId(body.postId);
            await this.markPostModel.create({ marckedUserId, postId });
        }
        catch (error) {
            throw new error;
        }
    }
    async deleteMark(body) {
        try {
            const marckedUserId = new mongoose_2.Types.ObjectId(body.marckedUserId);
            await this.markPostModel.deleteOne({ marckedUserId });
        }
        catch (error) {
            throw new error;
        }
    }
};
PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(publish_posts_schema_1.PublishPosts.name)),
    __param(1, (0, mongoose_1.InjectModel)(likes_schema_1.Likes.name)),
    __param(2, (0, mongoose_1.InjectModel)(publish_comments_schema_1.PublishComments.name)),
    __param(3, (0, mongoose_1.InjectModel)(repost_schema_1.Repost.name)),
    __param(4, (0, mongoose_1.InjectModel)(posts_mark_schema_1.MarkPost.name)),
    __param(5, (0, mongoose_1.InjectModel)(user_identity_schema_1.UserIdentity.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        files_service_1.FilesService,
        notification_service_1.NotificationService])
], PostsService);
exports.PostsService = PostsService;
//# sourceMappingURL=posts.service.js.map