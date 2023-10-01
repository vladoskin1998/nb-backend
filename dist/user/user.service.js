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
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(userModel, jwtTokenService) {
        this.userModel = userModel;
        this.jwtTokenService = jwtTokenService;
    }
    async getUsers({ role, searchName }) {
        try {
            if (role !== enum_1.ROLES.ALLUSERS) {
                return await this.userModel.find({
                    role,
                    fullName: { $regex: searchName, $options: 'i' }
                }).select('-password');
            }
            return await this.userModel.find({
                fullName: { $regex: searchName, $options: 'i' }
            }).select('-password');
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
    async userTextInfo(body) {
        try {
            const userId = new mongoose_2.Types.ObjectId(body._id);
            let sanitizedBody = Object.assign({}, body);
            delete sanitizedBody._id;
            let isUniq = false;
            if (body === null || body === void 0 ? void 0 : body.email) {
                isUniq = await this.userModel.findOne({ email: body === null || body === void 0 ? void 0 : body.email });
            }
            if (isUniq) {
                throw new common_1.HttpException(`Email is NOT uniq`, common_1.HttpStatus.BAD_REQUEST);
            }
            await this.userModel.findOneAndUpdate({ _id: userId }, Object.assign({}, sanitizedBody));
            return sanitizedBody;
        }
        catch (error) {
            throw error;
        }
    }
    async userChangePassword(body) {
        try {
            const { password, newPassword1, newPassword2 } = body;
            const userId = new mongoose_2.Types.ObjectId(body._id);
            const user = await this.userModel.findById({ _id: userId }).select('-isValidationUser');
            if (!user) {
                throw new common_1.HttpException(`User not found`, common_1.HttpStatus.BAD_REQUEST);
            }
            const isPassEquals = await bcrypt.compare(password, user.password);
            if (!isPassEquals) {
                throw new common_1.HttpException(`Bad password`, common_1.HttpStatus.BAD_REQUEST);
            }
            if (newPassword1 !== newPassword2) {
                throw new common_1.HttpException("New passwords have not arrived", common_1.HttpStatus.BAD_REQUEST);
            }
            const hashPassword = await bcrypt.hash(newPassword1, 3);
            await user.updateOne({ password: hashPassword });
            return "Password successful changed";
        }
        catch (error) {
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