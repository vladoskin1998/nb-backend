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
exports.PublishPostsSchema = exports.PublishPosts = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const enum_1 = require("../enum/enum");
const likes_schema_1 = require("../likes/likes.schema");
const user_identity_schema_1 = require("../user-identity/user-identity.schema");
const user_schema_1 = require("../user/user.schema");
let PublishPosts = class PublishPosts {
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: user_schema_1.User.name }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PublishPosts.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: user_schema_1.User.name, required: false }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PublishPosts.prototype, "repostUserId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: user_identity_schema_1.UserIdentity.name }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PublishPosts.prototype, "userIdentityId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: likes_schema_1.Likes.name }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PublishPosts.prototype, "likes", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PublishPosts.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PublishPosts.prototype, "text", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: (Array) }),
    __metadata("design:type", Array)
], PublishPosts.prototype, "filesName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: { lat: null, lng: null } }),
    __metadata("design:type", Object)
], PublishPosts.prototype, "coordinates", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: enum_1.PRIVACY.EVERYONE, enum: enum_1.PRIVACY }),
    __metadata("design:type", String)
], PublishPosts.prototype, "privacyPost", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: enum_1.PRIVACY.EVERYONE, enum: enum_1.PRIVACY }),
    __metadata("design:type", String)
], PublishPosts.prototype, "privacyComment", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: new Date() }),
    __metadata("design:type", Date)
], PublishPosts.prototype, "createdPostDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PublishPosts.prototype, "addressLocation", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], PublishPosts.prototype, "viewPost", void 0);
PublishPosts = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false })
], PublishPosts);
exports.PublishPosts = PublishPosts;
exports.PublishPostsSchema = mongoose_1.SchemaFactory.createForClass(PublishPosts);
//# sourceMappingURL=publish-posts.schema.js.map