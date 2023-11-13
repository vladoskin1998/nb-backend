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
exports.NotificationGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const notification_service_1 = require("./notification.service");
const socket_io_1 = require("socket.io");
const enum_1 = require("../enum/enum");
const messenger_dto_1 = require("../messenger/messenger.dto");
const common_1 = require("@nestjs/common");
let NotificationGateway = class NotificationGateway {
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    async joinNotificationRoom(socket, userId) {
        console.log("userID--------------->", String(userId));
        const room = String(userId);
        if (room) {
            socket.join(room);
        }
        console.log("notification room----->", this.server.sockets.adapter.rooms);
    }
    async leaveNotificationRoom(socket, chatIDDto) {
        const { chatId } = chatIDDto;
        socket.leave(String(chatId));
    }
    async sendNotificationToRooms(props) {
        const { rooms, ownerId, title, event, fileName, name } = props;
        for (let room of rooms) {
            this.server.to(room).emit(enum_1.SOCKET_NOTIFICATION_EVENT.NOTIFICATION, ownerId, title, fileName, name, event);
        }
        const offlineUserRooms = rooms.filter(room => !this.server.sockets.adapter.rooms.has(room));
        await this.notificationService.addRoomsNotification({
            offlineUserRooms,
            ownerId,
            title,
            fileName,
            name,
            event,
        });
    }
    async sendNotificationBroadcast(props) {
        const { ownerId, title, event, fileName, name } = props;
        this.server.emit(enum_1.SOCKET_NOTIFICATION_EVENT.NOTIFICATION, ownerId, title, fileName, name, event);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], NotificationGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)(enum_1.SOCKET_NOTIFICATION_EVENT.JOIN_ROOM_NOTIFICATION),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Promise)
], NotificationGateway.prototype, "joinNotificationRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(enum_1.SOCKET_NOTIFICATION_EVENT.LEAVE_ROOM_NOTIFICATION),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket,
        messenger_dto_1.ChatIDDto]),
    __metadata("design:returntype", Promise)
], NotificationGateway.prototype, "leaveNotificationRoom", null);
NotificationGateway = __decorate([
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
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => notification_service_1.NotificationService))),
    __metadata("design:paramtypes", [notification_service_1.NotificationService])
], NotificationGateway);
exports.NotificationGateway = NotificationGateway;
//# sourceMappingURL=notification.gateway.js.map