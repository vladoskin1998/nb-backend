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
exports.MessengerService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const chats_schema_1 = require("./chats.schema");
const mongoose_2 = require("mongoose");
const message_schema_1 = require("./message.schema");
const user_schema_1 = require("../user/user.schema");
const user_identity_schema_1 = require("../user-identity/user-identity.schema");
const files_service_1 = require("../files/files.service");
const notification_service_1 = require("../notification/notification.service");
const enum_1 = require("../enum/enum");
let MessengerService = class MessengerService {
    constructor(userIdentityModel, userModel, chatsModel, messageModel, filesService, notificationService) {
        this.userIdentityModel = userIdentityModel;
        this.userModel = userModel;
        this.chatsModel = chatsModel;
        this.messageModel = messageModel;
        this.filesService = filesService;
        this.notificationService = notificationService;
    }
    async openChat(dto) {
        try {
            const userIds = dto.participants.map(item => item.userId);
            const existingChat = await this.chatsModel.findOne({
                'participants.userId': { $all: userIds },
            });
            if (existingChat) {
                return {
                    participants: existingChat.participants,
                    chatId: existingChat._id,
                    isSupport: existingChat.isSupport,
                };
            }
            const newChat = await this.chatsModel.create({ participants: dto.participants, isSupport: dto.isSupport });
            return {
                participants: newChat.participants,
                chatId: newChat._id,
                isSupport: newChat.isSupport
            };
        }
        catch (error) {
            throw new Error('SERVER ERROR openChat');
        }
    }
    async listChat(dto) {
        try {
            const userId = dto._id;
            const chats = await this.chatsModel.find({
                participants: { $elemMatch: { userId: userId } },
                isSupport: dto.isSupport
            });
            const chatsWithLastMessage = await Promise.all(chats.map(async (item) => {
                const message = await this.messageModel.findOne({ chatId: item._id }).sort({ timestamp: -1 });
                return {
                    participants: item.toObject().participants,
                    chatId: item._id,
                    lastMessage: message ? message.toObject() : null,
                    isSupport: item.isSupport
                };
            }));
            return chatsWithLastMessage.reverse();
        }
        catch (error) {
            throw new Error('SERVER ERROR');
        }
    }
    async getChatHistory(dto) {
        try {
            const chatId = new mongoose_2.Types.ObjectId(dto.chatId);
            const history = await this.messageModel.find({ chatId });
            return history || [];
        }
        catch (error) {
            throw new Error('SERVER ERROR');
        }
    }
    async addMessage(payload) {
        try {
            const chatId = new mongoose_2.Types.ObjectId(payload.chatId);
            const senderId = new mongoose_2.Types.ObjectId(payload.senderId);
            await this.messageModel.create(Object.assign(Object.assign({}, payload), { chatId, senderId }));
            const { participants } = (await this.chatsModel.findOne({ _id: chatId }));
            const rooms = participants.map(item => item.userId);
            const { avatarFileName, fullName } = participants.find(item => item.userId === payload.senderId);
            await this.notificationService.sendNotification({
                ownerId: payload.senderId,
                rooms,
                fileName: avatarFileName,
                title: payload.content,
                name: fullName,
                event: enum_1.NOTIFICATION_EVENT.NOTIFICATION_MESSAGE
            });
            await this.messageModel.create(Object.assign(Object.assign({}, payload), { chatId, senderId, timestamp: new Date() }));
        }
        catch (error) {
            throw new Error('SERVER ERROR');
        }
    }
    async fileMessage(file) {
        try {
            return await this.filesService.uploadSingleFile(file, 'uploads/messenger', false);
        }
        catch (error) {
            throw error;
        }
    }
};
MessengerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_identity_schema_1.UserIdentity.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(2, (0, mongoose_1.InjectModel)(chats_schema_1.Chats.name)),
    __param(3, (0, mongoose_1.InjectModel)(message_schema_1.Message.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        files_service_1.FilesService,
        notification_service_1.NotificationService])
], MessengerService);
exports.MessengerService = MessengerService;
//# sourceMappingURL=messenger.service.js.map