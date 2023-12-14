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
exports.MessengerController = void 0;
const common_1 = require("@nestjs/common");
const messenger_service_1 = require("./messenger.service");
const messenger_dto_1 = require("./messenger.dto");
const platform_express_1 = require("@nestjs/platform-express");
let MessengerController = class MessengerController {
    constructor(messengerService) {
        this.messengerService = messengerService;
    }
    async openChat(dto) {
        const targetChat = await this.messengerService.openChat(dto);
        return targetChat;
    }
    async newChat(dto) {
        const targetChat = await this.messengerService.newChat(dto);
        console.log(dto.groupName);
        return targetChat;
    }
    async listChat(dto) {
        const userChatList = await this.messengerService.listChat(dto);
        return userChatList;
    }
    async getChatHistory(dto) {
        const history = await this.messengerService.getChatHistory(dto);
        return history;
    }
    async messageFile(file) {
        return await this.messengerService.fileMessage(file);
    }
    async readMessages(dto) {
        await this.messengerService.readMessage(dto);
    }
};
__decorate([
    (0, common_1.Post)('open-chat'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [messenger_dto_1.NewChatDto]),
    __metadata("design:returntype", Promise)
], MessengerController.prototype, "openChat", null);
__decorate([
    (0, common_1.Post)('new-chat'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [messenger_dto_1.NewChatDto]),
    __metadata("design:returntype", Promise)
], MessengerController.prototype, "newChat", null);
__decorate([
    (0, common_1.Post)('list-chat'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [messenger_dto_1.ListChatDto]),
    __metadata("design:returntype", Promise)
], MessengerController.prototype, "listChat", null);
__decorate([
    (0, common_1.Post)('list-message'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [messenger_dto_1.ChatIDDto]),
    __metadata("design:returntype", Promise)
], MessengerController.prototype, "getChatHistory", null);
__decorate([
    (0, common_1.Post)('file-message'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessengerController.prototype, "messageFile", null);
__decorate([
    (0, common_1.Post)('read-message'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [messenger_dto_1.ReadMessageIDDto]),
    __metadata("design:returntype", Promise)
], MessengerController.prototype, "readMessages", null);
MessengerController = __decorate([
    (0, common_1.Controller)('messenger'),
    __metadata("design:paramtypes", [messenger_service_1.MessengerService])
], MessengerController);
exports.MessengerController = MessengerController;
//# sourceMappingURL=messenger.controller.js.map