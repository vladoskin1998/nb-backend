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
exports.StatisticsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const activities_schema_1 = require("../activities/activities.schema");
const category_schema_1 = require("../category/category.schema");
const message_schema_1 = require("../messenger/message.schema");
const user_identity_schema_1 = require("../user-identity/user-identity.schema");
const user_schema_1 = require("../user/user.schema");
const statistic_schema_1 = require("./statistic.schema");
let StatisticsService = class StatisticsService {
    constructor(activitiesModel, categoryModel, userModel, messageModel, userIdentityModel, statisticModel) {
        this.activitiesModel = activitiesModel;
        this.categoryModel = categoryModel;
        this.userModel = userModel;
        this.messageModel = messageModel;
        this.userIdentityModel = userIdentityModel;
        this.statisticModel = statisticModel;
    }
    async countDocumentsDb() {
        try {
            const countServices = await this.categoryModel.countDocuments();
            const countActivities = await this.activitiesModel.countDocuments();
            const countUsers = await this.userModel.countDocuments();
            const countMessages = await this.messageModel.countDocuments();
            return {
                countServices,
                countActivities,
                countUsers,
                countMessages
            };
        }
        catch (error) {
        }
    }
    async countUser() {
        const yesterday = new Date();
        yesterday.setUTCHours(0, 0, 0, 0);
        yesterday.setDate(yesterday.getDate() - 1);
        const totalUsers = await this.userModel.countDocuments();
        const activeUsers = await this.userIdentityModel
            .countDocuments({
            createdUserDate: { $gte: yesterday },
            isGotAllProfileInfo: true,
        })
            .exec();
        const nonActiveUsers = await this.userIdentityModel
            .countDocuments({
            createdUserDate: { $gte: yesterday },
            isGotAllProfileInfo: false,
        })
            .exec();
        const newUsers = activeUsers + nonActiveUsers;
        return {
            totalUsers,
            newUsers,
            activeUsers,
            nonActiveUsers,
        };
    }
    async getDocumentUsersNumber({ limit = 10 }) {
        return (await this.statisticModel.find().sort({ createdStatisticDate: -1 }).limit(limit)).reverse();
    }
    async saveStatistic() {
        const getStatisticOneDay = await this.countUser();
        await this.statisticModel.create(getStatisticOneDay);
    }
};
StatisticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(activities_schema_1.Activities.name)),
    __param(1, (0, mongoose_1.InjectModel)(category_schema_1.Category.name)),
    __param(2, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(3, (0, mongoose_1.InjectModel)(message_schema_1.Message.name)),
    __param(4, (0, mongoose_1.InjectModel)(user_identity_schema_1.UserIdentity.name)),
    __param(5, (0, mongoose_1.InjectModel)(statistic_schema_1.Statistic.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], StatisticsService);
exports.StatisticsService = StatisticsService;
//# sourceMappingURL=statistics.service.js.map