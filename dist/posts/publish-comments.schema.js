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
exports.PublishCommentsSchema = exports.PublishComments = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const publish_posts_schema_1 = require("./publish-posts.schema");
const user_identity_schema_1 = require("../user-identity/user-identity.schema");
const user_schema_1 = require("../user/user.schema");
const likes_schema_1 = require("../likes/likes.schema");
let PublishComments = class PublishComments {
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: user_schema_1.User.name }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PublishComments.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: user_identity_schema_1.UserIdentity.name }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PublishComments.prototype, "userIdentityId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: publish_posts_schema_1.PublishPosts.name }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PublishComments.prototype, "postId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: likes_schema_1.Likes.name }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PublishComments.prototype, "likes", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PublishComments.prototype, "text", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: new Date() }),
    __metadata("design:type", Date)
], PublishComments.prototype, "createdDateComment", void 0);
PublishComments = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false })
], PublishComments);
exports.PublishComments = PublishComments;
exports.PublishCommentsSchema = mongoose_1.SchemaFactory.createForClass(PublishComments);
//# sourceMappingURL=publish-comments.schema.js.map