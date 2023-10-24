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
let PostsService = class PostsService {
    constructor(publishPostsModel, filesService) {
        this.publishPostsModel = publishPostsModel;
        this.filesService = filesService;
    }
    async getPosts(body) {
        const pageSize = 50;
        const allPageNumber = Math.ceil((await this.publishPostsModel.countDocuments()) / pageSize);
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
            .exec();
        return { posts, allPageNumber };
    }
    async addPost({ payload, files }) {
        try {
            const userId = new mongoose_2.Types.ObjectId(payload.userId);
            const userIdentityId = new mongoose_2.Types.ObjectId(payload.userIdentityId);
            const filesName = await this.filesService.uploadFiles(files, 'uploads/publish_post', false);
            return await this.publishPostsModel.create(Object.assign(Object.assign({}, payload), { filesName, userId, userIdentityId }));
        }
        catch (error) {
        }
    }
};
PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(publish_posts_schema_1.PublishPosts.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        files_service_1.FilesService])
], PostsService);
exports.PostsService = PostsService;
//# sourceMappingURL=posts.service.js.map