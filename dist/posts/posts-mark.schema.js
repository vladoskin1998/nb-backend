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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkPostSchema = exports.MarkPost = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../user/user.schema");
const publish_posts_schema_1 = require("./publish-posts.schema");
let MarkPost = class MarkPost {
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: user_schema_1.User.name }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], MarkPost.prototype, "marckedUserId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: publish_posts_schema_1.PublishPosts.name }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], MarkPost.prototype, "postId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: new Date() }),
    __metadata("design:type", Date)
], MarkPost.prototype, "createdPostDate", void 0);
MarkPost = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false })
], MarkPost);
exports.MarkPost = MarkPost;
exports.MarkPostSchema = mongoose_1.SchemaFactory.createForClass(MarkPost);
//# sourceMappingURL=posts-mark.schema.js.map