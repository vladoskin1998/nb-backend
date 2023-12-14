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
            console.log(dto);
            const userIds = dto.participants.map(item => new mongoose_2.Types.ObjectId(item.userId));
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
                participants: newChat === null || newChat === void 0 ? void 0 : newChat.participants,
                chatId: newChat._id,
                isSupport: newChat.isSupport
            };
        }
        catch (error) {
            console.error('Error in openChat:', error);
            throw new Error('SERVER ERROR openChat');
        }
    }
    async newChat(dto) {
        try {
            const userIds = dto.participants.map(item => item.userId);
            const groupName = dto.groupName;
            const existingChat = await this.chatsModel.findOne({
                'participants.userId': { $all: userIds },
            });
            if (existingChat) {
                await this.chatsModel.updateOne({ participants: dto.participants, isSupport: dto.isSupport, groupName: dto.groupName });
            }
            else {
                await this.chatsModel.create({ participants: dto.participants, isSupport: dto.isSupport, groupName: dto.groupName });
            }
            console.log(groupName);
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
                    isSupport: item.isSupport,
                    groupName: item.groupName,
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
            const { participants } = (await this.chatsModel.findOne({ _id: chatId }));
            const rooms = participants.map(item => item.userId.toString());
            const user = await this.userModel.findOne({ _id: senderId });
            await this.notificationService.sendNotification({
                ownerId: payload.senderId,
                rooms,
                fileName: user.avatarFileName,
                title: payload.content,
                name: user.fullName,
                event: enum_1.NOTIFICATION_EVENT.NOTIFICATION_MESSAGE
            });
            const message = await this.messageModel.create(Object.assign(Object.assign({}, payload), { chatId, senderId, timestamp: new Date(), audio: false, forward: false }));
            return { messageId: message._id.toString() };
        }
        catch (error) {
            throw new Error('SERVER ERROR');
        }
    }
    async deleteLikedMessage(payload) {
        try {
            const likeSenderId = new mongoose_2.Types.ObjectId(payload.senderId);
            const messages = await this.messageModel.findOne({
                senderId: likeSenderId,
                timestamp: payload.timestamp
            });
            await this.messageModel.updateOne({ _id: new mongoose_2.Types.ObjectId(messages._id) }, { like: "" });
        }
        catch (e) {
            throw new Error(e);
        }
    }
    async createLikedMessage(payload) {
        try {
            const likeSenderId = new mongoose_2.Types.ObjectId(payload.senderId);
            const senderId = new mongoose_2.Types.ObjectId(payload.senderId);
            const messages = await this.messageModel.findOne({
                senderId: senderId,
                timestamp: payload.timestamp
            });
            await this.messageModel.updateOne({ _id: new mongoose_2.Types.ObjectId(messages._id) }, { like: payload.like });
        }
        catch (e) {
            throw new Error(e);
        }
    }
    async addVoiceMessage(payload) {
        try {
            const chatId = new mongoose_2.Types.ObjectId(payload.chatId);
            const senderId = new mongoose_2.Types.ObjectId(payload.senderId);
            const { participants } = (await this.chatsModel.findOne({ _id: chatId }));
            const rooms = participants.map(item => item.userId.toString());
            const user = await this.userModel.findOne({ _id: senderId });
            await this.notificationService.sendNotification({
                ownerId: payload.senderId,
                rooms,
                fileName: user.avatarFileName,
                title: "Voice Message",
                name: user.fullName,
                event: enum_1.NOTIFICATION_EVENT.NOTIFICATION_MESSAGE
            });
            console.log(senderId);
            const message = await this.messageModel.create(Object.assign(Object.assign({}, payload), { chatId, senderId, timestamp: new Date(), forward: false, audio: true, content: "Voice Message" }));
            return { messageId: message._id.toString() };
        }
        catch (error) {
            throw new Error('SERVER ERROR');
        }
    }
    async deleteMessage(payload) {
        try {
            const chatId = new mongoose_2.Types.ObjectId(payload.chatId);
            const senderId = new mongoose_2.Types.ObjectId(payload.senderId);
            const messages = await this.messageModel.findOne({
                senderId: senderId,
                timestamp: payload.timestamp
            });
            await this.messageModel.deleteOne({ _id: new mongoose_2.Types.ObjectId(messages._id) });
            console.log(messages, payload.timestamp, senderId);
        }
        catch (e) {
            throw new Error(e);
        }
    }
    async forwardMessage(payload) {
        try {
            const chatId = new mongoose_2.Types.ObjectId(payload.chatId);
            const senderIdold = new mongoose_2.Types.ObjectId(payload.senderIdold);
            const senderId = new mongoose_2.Types.ObjectId(payload.senderId);
            const senderName = (await this.userModel.findOne(senderIdold)).fullName;
            console.log(payload.file);
            await this.messageModel.create(Object.assign(Object.assign({}, payload), { chatId, senderIdold: senderName, timestamp: new Date(), forward: true, senderId: senderId, file: payload.file }));
        }
        catch (e) {
            throw new Error(e);
        }
    }
    async readMessage({ messageId }) {
        try {
            await this.messageModel.findOneAndUpdate({ _id: new mongoose_2.Types.ObjectId(messageId) }, { isRead: true });
        }
        catch (error) {
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