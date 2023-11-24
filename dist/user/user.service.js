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
const user_identity_schema_1 = require("../user-identity/user-identity.schema");
const utils_1 = require("../utils/utils");
const friends_schema_1 = require("./friends.schema");
let UserService = class UserService {
    constructor(userModel, userIdentityModel, friendsModel, jwtTokenService) {
        this.userModel = userModel;
        this.userIdentityModel = userIdentityModel;
        this.friendsModel = friendsModel;
        this.jwtTokenService = jwtTokenService;
    }
    async getUsers({ _id, role, searchName }) {
        try {
            let query = { fullName: { $regex: searchName, $options: 'i' } };
            if (role !== enum_1.ROLES.ALLUSERS) {
                query.role = role;
            }
            if (_id) {
                query._id = { $ne: _id };
            }
            return await this.userModel.find(query).select('-password');
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
    async checkUsersExist(userIds) {
        const userExistPromises = userIds.map(async (userId) => {
            const userExists = await this.userModel.exists({ _id: new mongoose_2.Types.ObjectId(userId) });
            return userExists;
        });
        const userExistResults = await Promise.all(userExistPromises);
        return userExistResults;
    }
    async getClosestUserByRole(body) {
        const { role, myLat, myLng } = body;
        const usersByRole = await this.userModel.find({ role }).select('_id fullName');
        console.log(usersByRole);
        const userWithCoord = await Promise.all(usersByRole.map(async (item) => {
            const userId = new mongoose_2.Types.ObjectId(item._id);
            const { coordinates, avatarFileName } = await this.userIdentityModel.findOne({ user: userId }).select('avatarFileName coordinates');
            return Object.assign(Object.assign({}, item.toObject()), { avatarFileName, coordinates });
        }));
        let closestUser = null;
        let minDistance = Infinity;
        for (const user of userWithCoord) {
            const distance = (0, utils_1.getDistance)({
                myLat,
                myLng,
                lat: user.coordinates.lat,
                lng: user.coordinates.lng
            });
            if (distance < minDistance) {
                minDistance = distance;
                closestUser = user;
            }
        }
        return Object.assign(Object.assign({}, closestUser), { userId: closestUser._id });
    }
    async getMyFriends(body) {
        try {
            const userId = new mongoose_2.Types.ObjectId(body._id);
            const friends = await this.friendsModel.find({ userId }).populate({
                path: 'friendId',
                select: 'fullName email phone role',
                options: { sort: { fullName: 1 } }
            });
            return friends;
        }
        catch (error) {
        }
    }
    async checkToMyFriend(body) {
        try {
            const userId = new mongoose_2.Types.ObjectId(body._id);
            const friendId = new mongoose_2.Types.ObjectId(body.friendId);
            const isAlredyExistFriend = await this.friendsModel.findOne({
                $and: [
                    { userId },
                    { friendId },
                ],
            });
            console.log(isAlredyExistFriend);
            return Boolean(isAlredyExistFriend);
        }
        catch (error) {
            throw new error;
        }
    }
    async addToMyFriend(body) {
        try {
            const userId = new mongoose_2.Types.ObjectId(body._id);
            const friendId = new mongoose_2.Types.ObjectId(body.friendId);
            const isAlredyExistFriend = await this.checkToMyFriend(body);
            if (isAlredyExistFriend) {
                throw new common_1.HttpException(`Friend already added`, common_1.HttpStatus.BAD_REQUEST);
            }
            const friend = await this.friendsModel.create({ userId, friendId });
            return await friend.populate({
                path: 'friendId',
                select: 'fullName email phone role'
            });
        }
        catch (error) {
            throw new error;
        }
    }
    async deleteMyFriend(body) {
        try {
            const userId = new mongoose_2.Types.ObjectId(body._id);
            const friendId = new mongoose_2.Types.ObjectId(body.friendId);
            const friend = await this.friendsModel.findOneAndRemove({
                $and: [
                    { userId },
                    { friendId },
                ],
            });
            return friend;
        }
        catch (error) {
            throw new error;
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_identity_schema_1.UserIdentity.name)),
    __param(2, (0, mongoose_1.InjectModel)(friends_schema_1.Friends.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        jwt_auth_service_1.JwtTokenService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map