"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsModule = void 0;
const common_1 = require("@nestjs/common");
const statistics_service_1 = require("./statistics.service");
const statistics_controller_1 = require("./statistics.controller");
const mongoose_1 = require("@nestjs/mongoose");
const activities_schema_1 = require("../activities/activities.schema");
const category_schema_1 = require("../category/category.schema");
const message_schema_1 = require("../messenger/message.schema");
const user_schema_1 = require("../user/user.schema");
const user_identity_schema_1 = require("../user-identity/user-identity.schema");
const statistic_schema_1 = require("./statistic.schema");
const schedule_1 = require("@nestjs/schedule");
const statistic_scheduler_1 = require("./statistic.scheduler");
let StatisticsModule = class StatisticsModule {
};
StatisticsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            mongoose_1.MongooseModule.forFeature([
                { name: activities_schema_1.Activities.name, schema: activities_schema_1.ActivitiesSchema },
                { name: message_schema_1.Message.name, schema: message_schema_1.MessageSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: category_schema_1.Category.name, schema: category_schema_1.CategorySchema },
                { name: user_identity_schema_1.UserIdentity.name, schema: user_identity_schema_1.UserIdentitySchema },
                { name: statistic_schema_1.Statistic.name, schema: statistic_schema_1.StatisticSchema }
            ]),
        ],
        controllers: [statistics_controller_1.StatisticsController],
        providers: [statistics_service_1.StatisticsService, statistic_scheduler_1.ScheduledTasksService]
    })
], StatisticsModule);
exports.StatisticsModule = StatisticsModule;
//# sourceMappingURL=statistics.module.js.map