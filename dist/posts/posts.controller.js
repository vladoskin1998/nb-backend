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
exports.PostsController = void 0;
const common_1 = require("@nestjs/common");
const posts_service_1 = require("./posts.service");
const platform_express_1 = require("@nestjs/platform-express");
const posts_dto_1 = require("./posts.dto");
const user_dto_1 = require("../user/user.dto");
const notification_dto_1 = require("../notification/notification.dto");
let PostsController = class PostsController {
    constructor(postsService) {
        this.postsService = postsService;
    }
    async getPosts(body) {
        return await this.postsService.getPosts(body);
    }
    async getPost(body) {
        return await this.postsService.getOnePost(body);
    }
    async getPostByMark(body) {
        return await this.postsService.getPostByMark(body);
    }
    async getComments(body) {
        return await this.postsService.getComments(body);
    }
    async getMyComments(body) {
        return await this.postsService.getMyComments(body);
    }
    async getPostPin(body) {
        return await this.postsService.getPostPin(body);
    }
    async addPost(body, files) {
        const payload = JSON.parse(body.payload);
        return await this.postsService.addPost({ files, payload });
    }
    async changePostPrivacy(body) {
        return await this.postsService.changePostPrivacy(body);
    }
    async updatePostPin(body) {
        return await this.postsService.updatePostPin(body);
    }
    async addComment(body) {
        return await this.postsService.addComment(body);
    }
    async updateNotification(body) {
        return await this.postsService.updateNotification(body);
    }
    async updateRepost(body) {
        return await this.postsService.updateRepost(body);
    }
    async addMark(body) {
        return await this.postsService.addMark(body);
    }
    async deleteMark(body) {
        return await this.postsService.deleteMark(body);
    }
    async hidePost(body) {
        return await this.postsService.hidePost(body);
    }
    async deletePost(body) {
        return await this.postsService.deletePost(body);
    }
};
__decorate([
    (0, common_1.Post)('get-posts'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [posts_dto_1.GetPostsDto]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getPosts", null);
__decorate([
    (0, common_1.Post)('get-post'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [posts_dto_1.GetPostDto]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getPost", null);
__decorate([
    (0, common_1.Post)('get-post'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [posts_dto_1.GetMarkPostDto]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getPostByMark", null);
__decorate([
    (0, common_1.Post)('get-comments'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [posts_dto_1.GetPostDto]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getComments", null);
__decorate([
    (0, common_1.Post)('get-my-comments'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.IDUserDto]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getMyComments", null);
__decorate([
    (0, common_1.Post)('get-post-pin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notification_dto_1.UserIdDTO]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getPostPin", null);
__decorate([
    (0, common_1.Post)('add-post'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "addPost", null);
__decorate([
    (0, common_1.Post)('change-post-privacy'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [posts_dto_1.ChangePostPrivacyDto]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "changePostPrivacy", null);
__decorate([
    (0, common_1.Post)('update-post-pin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [posts_dto_1.UpdatePinPostDto]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "updatePostPin", null);
__decorate([
    (0, common_1.Post)('add-comment'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [posts_dto_1.AddCommentDto]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "addComment", null);
__decorate([
    (0, common_1.Post)('update-notification'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [posts_dto_1.NotificationPostDto]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "updateNotification", null);
__decorate([
    (0, common_1.Post)('update-repost'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [posts_dto_1.AddRepostDto]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "updateRepost", null);
__decorate([
    (0, common_1.Post)('add-mark'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [posts_dto_1.AddMarkPostDto]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "addMark", null);
__decorate([
    (0, common_1.Post)('delete-mark'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [posts_dto_1.AddMarkPostDto]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "deleteMark", null);
__decorate([
    (0, common_1.Post)('hide-post'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [posts_dto_1.PostHideDto]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "hidePost", null);
__decorate([
    (0, common_1.Post)('delete-post'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [posts_dto_1.DeletePostDto]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "deletePost", null);
PostsController = __decorate([
    (0, common_1.Controller)('posts'),
    __metadata("design:paramtypes", [posts_service_1.PostsService])
], PostsController);
exports.PostsController = PostsController;
//# sourceMappingURL=posts.controller.js.map