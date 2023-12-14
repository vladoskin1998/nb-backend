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
exports.MessengerGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const messenger_service_1 = require("./messenger.service");
const enum_1 = require("../enum/enum");
const messenger_dto_1 = require("./messenger.dto");
let MessengerGateway = class MessengerGateway {
    constructor(messengerService) {
        this.messengerService = messengerService;
    }
    async joinRoom(socket, chatId) {
        const room = String(chatId);
        socket.join(room);
        console.log("join room----->", this.server.sockets.adapter.rooms);
    }
    async leaveRoom(socket, chatIDDto) {
        const { chatId } = chatIDDto;
        console.log("leave room", this.server.sockets.adapter.rooms);
        socket.leave(String(chatId));
    }
    async handleMessage(payload, socket) {
        const { chatId, senderId, content, timestamp, isRead, file, like, audio } = payload;
        await this.messengerService.addMessage({
            chatId,
            senderId,
            content,
            timestamp,
            isRead,
            file,
            like,
            audio
        });
        console.log('123');
        socket
            .to(String(chatId))
            .emit(enum_1.SOCKET_MESSENDER_EVENT.GET_PRIVATE_MESSAGE, chatId, senderId, content, timestamp, isRead, file);
    }
    async handleVoiceMessage(payload, socket) {
        const { chatId, senderId, timestamp, isRead, file, audio, like, } = payload;
        await this.messengerService.addVoiceMessage({
            chatId,
            senderId,
            timestamp,
            isRead,
            file,
            audio,
            like,
        });
        socket
            .to(String(chatId))
            .emit(enum_1.SOCKET_MESSENDER_EVENT.GET_PRIVATE_MESSAGE, chatId, senderId, timestamp, isRead, file, audio);
    }
    async findMessage(payload, socket) {
        const { chatId, senderId, content, timestamp, isRead, file, like, audio, } = payload;
        await this.messengerService.deleteMessage({
            chatId,
            senderId,
            content,
            timestamp,
            isRead,
            file,
            like,
            audio,
        });
        socket
            .to(String(chatId))
            .emit(enum_1.SOCKET_MESSENDER_EVENT.GET_PRIVATE_MESSAGE, chatId, senderId, content, timestamp, isRead, file);
    }
    async findLikedMessage(payload, socket) {
        const { chatId, senderId, timestamp, like } = payload;
        await this.messengerService.deleteLikedMessage({
            chatId,
            senderId,
            timestamp,
            like
        });
        socket
            .to(String(chatId))
            .emit(enum_1.SOCKET_MESSENDER_EVENT.GET_PRIVATE_MESSAGE, chatId, senderId, timestamp, like);
    }
    async createLikedMessage(payload, socket) {
        const { chatId, senderId, timestamp, like } = payload;
        await this.messengerService.createLikedMessage({
            chatId,
            senderId,
            timestamp,
            like
        });
        socket
            .to(String(chatId))
            .emit(enum_1.SOCKET_MESSENDER_EVENT.GET_PRIVATE_MESSAGE, chatId, senderId, timestamp, like);
    }
    async findToMessage(payload, socket) {
        const { chatId, senderId, content, timestamp, senderIdold, file, audio, like } = payload;
        await this.messengerService.forwardMessage({
            chatId,
            senderId,
            content,
            timestamp,
            senderIdold,
            file,
            audio,
            like
        });
        socket
            .to(String(chatId))
            .emit(enum_1.SOCKET_MESSENDER_EVENT.GET_PRIVATE_MESSAGE, chatId, senderId, content, timestamp, senderIdold, audio);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], MessengerGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)(enum_1.SOCKET_MESSENDER_EVENT.JOIN_ROOM),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Promise)
], MessengerGateway.prototype, "joinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(enum_1.SOCKET_MESSENDER_EVENT.LEAVE_ROOM),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket,
        messenger_dto_1.ChatIDDto]),
    __metadata("design:returntype", Promise)
], MessengerGateway.prototype, "leaveRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(enum_1.SOCKET_MESSENDER_EVENT.SEND_PRIVATE_MESSAGE),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], MessengerGateway.prototype, "handleMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(enum_1.SOCKET_MESSENDER_EVENT.SEND_PRIVATE_VOICE_MESSAGE),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], MessengerGateway.prototype, "handleVoiceMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(enum_1.SOCKET_MESSENDER_EVENT.DELETE_PRIVATE_MESSAGE),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], MessengerGateway.prototype, "findMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(enum_1.SOCKET_MESSENDER_EVENT.DELETE_PRIVATE_MESSAGE_LIKE),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], MessengerGateway.prototype, "findLikedMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(enum_1.SOCKET_MESSENDER_EVENT.SEND_PRIVATE_MESSAGE_LIKE),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], MessengerGateway.prototype, "createLikedMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(enum_1.SOCKET_MESSENDER_EVENT.FORWARD_PRIVATE_MESSAGE),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], MessengerGateway.prototype, "findToMessage", null);
MessengerGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(5001, {
        cors: {
            origin: ['http://localhost:5000',
                'http://localhost:3000',
                'https://maps.googleapis.com',
                "http://178.20.154.144:5000",
                "http://178.20.154.144:5001",
                "https://environs.life",
            ],
            credentials: true,
        }
    }),
    __metadata("design:paramtypes", [messenger_service_1.MessengerService])
], MessengerGateway);
exports.MessengerGateway = MessengerGateway;
//# sourceMappingURL=messenger.gateway.js.map