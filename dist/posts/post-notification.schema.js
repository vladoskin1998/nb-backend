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
exports.PostNotificationSchema = exports.PostNotification = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const publish_posts_schema_1 = require("./publish-posts.schema");
const enum_1 = require("../enum/enum");
let PostNotification = class PostNotification {
};
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], PostNotification.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: publish_posts_schema_1.PublishPosts.name }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PostNotification.prototype, "postId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: enum_1.NOTIFICATION_POST.POST, enum: enum_1.NOTIFICATION_POST }),
    __metadata("design:type", String)
], PostNotification.prototype, "typeNotification", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: new Date() }),
    __metadata("design:type", Date)
], PostNotification.prototype, "createdRepostDate", void 0);
PostNotification = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false })
], PostNotification);
exports.PostNotification = PostNotification;
exports.PostNotificationSchema = mongoose_1.SchemaFactory.createForClass(PostNotification);
//# sourceMappingURL=post-notification.schema.js.map