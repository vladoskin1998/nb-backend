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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_schema_1 = require("./user.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const enum_1 = require("../enum/enum");
const jwt_auth_service_1 = require("../auth/jwt-auth.service");
let UserService = class UserService {
    constructor(userModel, jwtTokenService) {
        this.userModel = userModel;
        this.jwtTokenService = jwtTokenService;
    }
    async changeLocation(body) {
        try {
            const userId = new mongoose_2.Types.ObjectId(body._id);
            const { lat, lng } = body.coordinates;
            if (!lat || !lng) {
                throw new common_1.HttpException("BAD COORDINtes", common_1.HttpStatus.BAD_REQUEST);
            }
            await this.userModel.findByIdAndUpdate(userId, Object.assign(Object.assign({}, body), { isLocationVerify: true }));
            return { isLocationVerify: true };
        }
        catch (error) {
            throw error;
        }
    }
    async getUsersByRole(role) {
        try {
            if (role !== enum_1.ROLES.ALLUSERS) {
                return this.userModel.find({ role }).select('-password');
            }
            return await this.userModel.find().select('-password');
        }
        catch (error) {
            throw error;
        }
    }
    async deleteUser(_id) {
        try {
            const userId = new mongoose_2.Types.ObjectId(_id);
            await this.jwtTokenService.deleteToken(userId);
            await this.userModel.deleteOne({ _id: userId });
        }
        catch (error) {
            throw error;
        }
    }
    async blockUser(_id) {
        try {
            const userId = new mongoose_2.Types.ObjectId(_id);
            await this.userModel.findByIdAndUpdate({ _id: userId }, { role: enum_1.ROLES.BLOCKED, blockedUserDate: new Date() });
        }
        catch (error) {
            throw error;
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_auth_service_1.JwtTokenService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map