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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_dto_1 = require("./user.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getUsersByRole(body) {
        return await this.userService.getUsers(body);
    }
    async deleteUser(body) {
        return await this.userService.deleteUser(body._id);
    }
    async blockUser(body) {
        console.log(body);
        return await this.userService.blockUser(body._id);
    }
    async userTextInfo(body) {
        return await this.userService.userTextInfo(body);
    }
    async getClosestUserByRole(body) {
        return await this.userService.getClosestUserByRole(body);
    }
    async getMyFriends(body) {
        return await this.userService.getMyFriends(body);
    }
    async checkToMyFriend(body) {
        return await this.userService.checkToMyFriend(body);
    }
    async addToMyFriend(body) {
        return await this.userService.addToMyFriend(body);
    }
    async deleteMyFriend(body) {
        return await this.userService.deleteMyFriend(body);
    }
};
__decorate([
    (0, common_1.Post)('get-users'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.GetUsers]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsersByRole", null);
__decorate([
    (0, common_1.Post)('delete-user'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.IDUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Post)('block-user'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.IDUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "blockUser", null);
__decorate([
    (0, common_1.Post)('user-text-info'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserTextInfoDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "userTextInfo", null);
__decorate([
    (0, common_1.Post)('get-closest-user'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.ClosestUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getClosestUserByRole", null);
__decorate([
    (0, common_1.Post)('get-friends'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.IDUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getMyFriends", null);
__decorate([
    (0, common_1.Post)('check-my-friend'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.AddFriendDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "checkToMyFriend", null);
__decorate([
    (0, common_1.Post)('add-my-friend'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.AddFriendDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addToMyFriend", null);
__decorate([
    (0, common_1.Post)('delete-to-friend'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.AddFriendDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteMyFriend", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map