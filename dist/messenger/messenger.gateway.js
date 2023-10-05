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
        console.log(room);
        socket.join(room);
        console.log("join room", this.server.sockets.adapter.rooms);
    }
    async leaveRoom(socket, chatIDDto) {
        const { chatId } = chatIDDto;
        console.log("leave room", this.server.sockets.adapter.rooms);
        socket.leave(String(chatId));
    }
    async handleMessage(payload, socket) {
        const { chatId, senderId, content, timestamp, isRead } = payload;
        await this.messengerService.addMessage({
            chatId,
            senderId,
            content,
            timestamp,
            isRead
        });
        console.log("sendmessage", chatId);
        console.log("sendmessage room", this.server.sockets.adapter.rooms);
        socket
            .to(String(chatId))
            .emit(enum_1.SOCKET_MESSENDER_EVENT.GET_PRIVATE_MESSAGE, chatId, senderId, content, timestamp, isRead);
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
MessengerGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(5001, {
        cors: {
            origin: ['http://localhost:5000',
                'http://localhost:3000',
                "http://5.180.180.221:5000",
                "http://185.237.14.239:5001"
            ],
            credentials: true,
        },
    }),
    __metadata("design:paramtypes", [messenger_service_1.MessengerService])
], MessengerGateway);
exports.MessengerGateway = MessengerGateway;
//# sourceMappingURL=messenger.gateway.js.map