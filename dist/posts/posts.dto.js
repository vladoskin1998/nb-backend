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
exports.PostHideDto = exports.DeletePostDto = exports.AddMarkPostDto = exports.GetMarkPostDto = exports.ChangePostPrivacyDto = exports.AddRepostDto = exports.AddCommentDto = exports.UpdatePinPostDto = exports.NotificationPostDto = exports.GetPostDto = exports.GetPostsDto = void 0;
const class_validator_1 = require("class-validator");
const enum_1 = require("../enum/enum");
class GetPostsDto {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GetPostsDto.prototype, "pageNumber", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetPostsDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], GetPostsDto.prototype, "isMarkedOption", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], GetPostsDto.prototype, "listPinedPost", void 0);
exports.GetPostsDto = GetPostsDto;
class GetPostDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetPostDto.prototype, "postId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetPostDto.prototype, "userId", void 0);
exports.GetPostDto = GetPostDto;
class NotificationPostDto extends GetPostDto {
}
__decorate([
    (0, class_validator_1.IsEnum)(enum_1.NOTIFICATION_POST),
    __metadata("design:type", String)
], NotificationPostDto.prototype, "typeNotification", void 0);
exports.NotificationPostDto = NotificationPostDto;
class UpdatePinPostDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePinPostDto.prototype, "repostId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePinPostDto.prototype, "userId", void 0);
exports.UpdatePinPostDto = UpdatePinPostDto;
class AddCommentDto extends GetPostDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddCommentDto.prototype, "userIdentityId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddCommentDto.prototype, "text", void 0);
exports.AddCommentDto = AddCommentDto;
class AddRepostDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddRepostDto.prototype, "repostedUserId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddRepostDto.prototype, "postId", void 0);
exports.AddRepostDto = AddRepostDto;
class ChangePostPrivacyDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enum_1.PRIVACY),
    __metadata("design:type", String)
], ChangePostPrivacyDto.prototype, "privacyPost", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enum_1.PRIVACY),
    __metadata("design:type", String)
], ChangePostPrivacyDto.prototype, "privacyComment", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChangePostPrivacyDto.prototype, "postId", void 0);
exports.ChangePostPrivacyDto = ChangePostPrivacyDto;
class GetMarkPostDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetMarkPostDto.prototype, "marckedUserId", void 0);
exports.GetMarkPostDto = GetMarkPostDto;
class AddMarkPostDto extends GetMarkPostDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddMarkPostDto.prototype, "postId", void 0);
exports.AddMarkPostDto = AddMarkPostDto;
class DeletePostDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DeletePostDto.prototype, "postId", void 0);
exports.DeletePostDto = DeletePostDto;
class PostHideDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PostHideDto.prototype, "ownerId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PostHideDto.prototype, "hideUserId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PostHideDto.prototype, "hideRepostId", void 0);
exports.PostHideDto = PostHideDto;
//# sourceMappingURL=posts.dto.js.map