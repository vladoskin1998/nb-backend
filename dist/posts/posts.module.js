"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsModule = void 0;
const common_1 = require("@nestjs/common");
const posts_service_1 = require("./posts.service");
const posts_controller_1 = require("./posts.controller");
const files_module_1 = require("../files/files.module");
const mongoose_1 = require("@nestjs/mongoose");
const platform_express_1 = require("@nestjs/platform-express");
const publish_posts_schema_1 = require("./publish-posts.schema");
const likes_schema_1 = require("../likes/likes.schema");
const publish_comments_schema_1 = require("./publish-comments.schema");
let PostsModule = class PostsModule {
};
PostsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: publish_posts_schema_1.PublishPosts.name, schema: publish_posts_schema_1.PublishPostsSchema },
                { name: publish_comments_schema_1.PublishComments.name, schema: publish_comments_schema_1.PublishCommentsSchema },
                { name: likes_schema_1.Likes.name, schema: likes_schema_1.LikesSchema },
            ]),
            platform_express_1.MulterModule.register({}),
            files_module_1.FilesModule,
        ],
        controllers: [posts_controller_1.PostsController],
        providers: [posts_service_1.PostsService]
    })
], PostsModule);
exports.PostsModule = PostsModule;
//# sourceMappingURL=posts.module.js.map