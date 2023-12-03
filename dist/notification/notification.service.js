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
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const notification_gateway_1 = require("./notification.gateway");
const enum_1 = require("../enum/enum");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const notification_schema_1 = require("./notification.schema");
let NotificationService = class NotificationService {
    constructor(notificationGateway, notificationModel) {
        this.notificationGateway = notificationGateway;
        this.notificationModel = notificationModel;
    }
    async sendNotification(props) {
        try {
            const { ownerId, rooms } = props;
            const roomsWhithoutOwnerId = rooms.filter(item => item !== ownerId);
            await this.notificationGateway.sendNotificationToRooms(Object.assign(Object.assign({}, props), { rooms: roomsWhithoutOwnerId }));
        }
        catch (error) {
            throw new Error();
        }
    }
    async addRoomsNotification(props) {
        try {
            const { ownerId, offlineUserRooms, title, fileName, name, event } = props;
            Promise.all(offlineUserRooms.map(async (userId) => {
                await this.notificationModel.create({
                    ownerId,
                    userId,
                    title,
                    fileName,
                    name,
                    event,
                    mailing: enum_1.NOTIFICATION_MAILING.NOTIFICATION_ROOMS,
                });
            }));
        }
        catch (error) {
            throw new Error();
        }
    }
    async sendNotificationBroadcast(props) {
        try {
            const { ownerId, ownerIdentityId, title, fileName, name, event } = props;
            await this.notificationModel.create({
                ownerId,
                ownerIdentityId,
                title,
                fileName,
                name,
                event,
                mailing: enum_1.NOTIFICATION_MAILING.NOTIFICATION_BROADCAST,
            });
            await this.notificationGateway.sendNotificationBroadcast(props);
        }
        catch (error) {
            throw new Error();
        }
    }
    async getUserNotification(body) {
        try {
            const notification = await this.notificationModel.find({
                $or: [
                    { userId: body.userId },
                    { mailing: enum_1.NOTIFICATION_MAILING.NOTIFICATION_BROADCAST },
                ],
            })
                .populate({
                path: 'ownerId',
                select: 'fullName avatarFileName'
            });
            await this.notificationModel.deleteMany({ userId: body.userId });
            return notification.reverse();
        }
        catch (error) {
            throw new Error();
        }
    }
};
NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => notification_gateway_1.NotificationGateway))),
    __param(1, (0, mongoose_1.InjectModel)(notification_schema_1.Notification.name)),
    __metadata("design:paramtypes", [notification_gateway_1.NotificationGateway,
        mongoose_2.Model])
], NotificationService);
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map