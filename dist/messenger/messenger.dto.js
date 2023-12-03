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
exports.ListChatDto = exports.AddNewMessageDto = exports.ReadMessageIDDto = exports.ChatIDDto = exports.NewChatDto = exports.ParticipantDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const user_dto_1 = require("../user/user.dto");
const utils_1 = require("../utils/utils");
class ParticipantDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ParticipantDto.prototype, "userId", void 0);
exports.ParticipantDto = ParticipantDto;
class NewChatDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ParticipantDto),
    __metadata("design:type", Array)
], NewChatDto.prototype, "participants", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], NewChatDto.prototype, "isSupport", void 0);
exports.NewChatDto = NewChatDto;
class ChatIDDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChatIDDto.prototype, "chatId", void 0);
exports.ChatIDDto = ChatIDDto;
class ReadMessageIDDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReadMessageIDDto.prototype, "messageId", void 0);
exports.ReadMessageIDDto = ReadMessageIDDto;
class AddNewMessageDto extends ChatIDDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddNewMessageDto.prototype, "senderId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddNewMessageDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], AddNewMessageDto.prototype, "timestamp", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AddNewMessageDto.prototype, "isRead", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Validate)(utils_1.isNullOrString),
    __metadata("design:type", String)
], AddNewMessageDto.prototype, "file", void 0);
exports.AddNewMessageDto = AddNewMessageDto;
class ListChatDto extends user_dto_1.IDUserDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ListChatDto.prototype, "isSupport", void 0);
exports.ListChatDto = ListChatDto;
//# sourceMappingURL=messenger.dto.js.map