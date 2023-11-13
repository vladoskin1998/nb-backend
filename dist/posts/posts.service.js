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
let PostsService = class PostsService {
    constructor(publishPostsModel, likesModel, publishCommentsModel, userIdentity, filesService, notificationService) {
        this.publishPostsModel = publishPostsModel;
        this.likesModel = likesModel;
        this.publishCommentsModel = publishCommentsModel;
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
            const posts = await this.publishPostsModel
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
            const postWithLikes = await Promise.all(posts.map(async (post) => {
                var _a, _b, _c;
                const countComments = await this.publishCommentsModel.find({ postId: post._id }).countDocuments();
                return Object.assign(Object.assign({}, post.toObject()), { likeId: ((_a = post.toObject().likes) === null || _a === void 0 ? void 0 : _a._id) || '', likes: post.likes ? (_b = post.likes) === null || _b === void 0 ? void 0 : _b.usersId.length : 0, isLiked: (_c = post.likes) === null || _c === void 0 ? void 0 : _c.usersId.includes(userId), countComments });
            }));
            return { posts: postWithLikes, allPageNumber };
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getPost(body) {
        var _a, _b, _c;
        try {
            const postId = new mongoose_2.Types.ObjectId(body.postId);
            let post = await this.publishPostsModel
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
            await post.updateOne({ viewPost: post.viewPost + 1 });
            const postWithLike = Object.assign(Object.assign({}, post.toObject()), { likeId: ((_a = post.toObject().likes) === null || _a === void 0 ? void 0 : _a._id) || '', likes: post.likes ? (_b = post.likes) === null || _b === void 0 ? void 0 : _b.usersId.length : 0, isLiked: (_c = post.likes) === null || _c === void 0 ? void 0 : _c.usersId.includes(body.userId) });
            return {
                post: postWithLike,
            };
        }
        catch (error) {
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
            const commentWithLikes = comments.map((comment) => {
                var _a, _b, _c;
                return (Object.assign(Object.assign({}, comment.toObject()), { likeId: ((_a = comment.toObject().likes) === null || _a === void 0 ? void 0 : _a._id) || '', likes: comment.likes ? (_b = comment.likes) === null || _b === void 0 ? void 0 : _b.usersId.length : 0, isLiked: (_c = comment.likes) === null || _c === void 0 ? void 0 : _c.usersId.includes(body.userId) }));
            });
            return { comments: commentWithLikes, countComments };
        }
        catch (error) {
        }
    }
    async addPost({ payload, files }) {
        try {
            const userId = new mongoose_2.Types.ObjectId(payload.userId);
            const userIdentityId = new mongoose_2.Types.ObjectId(payload.userIdentityId);
            const filesName = await this.filesService.uploadFiles(files, 'uploads/publish_post', false);
            const likesId = (await this.likesModel.create({}))._id;
            await this.notificationService.sendNotificationBroadcast({
                ownerId: payload.userId,
                title: payload.text,
                fileName: filesName[0],
                name: payload.title,
                event: enum_1.NOTIFICATION_EVENT.NOTIFICATION_NEWS
            });
            return await this.publishPostsModel.create(Object.assign(Object.assign({}, payload), { filesName, userId, userIdentityId, likes: likesId }));
        }
        catch (error) {
            console.log(error);
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
        }
    }
};
PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(publish_posts_schema_1.PublishPosts.name)),
    __param(1, (0, mongoose_1.InjectModel)(likes_schema_1.Likes.name)),
    __param(2, (0, mongoose_1.InjectModel)(publish_comments_schema_1.PublishComments.name)),
    __param(3, (0, mongoose_1.InjectModel)(user_identity_schema_1.UserIdentity.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        files_service_1.FilesService,
        notification_service_1.NotificationService])
], PostsService);
exports.PostsService = PostsService;
//# sourceMappingURL=posts.service.js.map