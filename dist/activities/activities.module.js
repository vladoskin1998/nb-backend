"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivitiesModule = void 0;
const common_1 = require("@nestjs/common");
const activities_service_1 = require("./activities.service");
const activities_controller_1 = require("./activities.controller");
const activities_schema_1 = require("./activities.schema");
const mongoose_1 = require("@nestjs/mongoose");
const platform_express_1 = require("@nestjs/platform-express");
const files_module_1 = require("../files/files.module");
const publish_activities_schema_1 = require("./publish-activities.schema");
let ActivitiesModule = class ActivitiesModule {
};
ActivitiesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: activities_schema_1.Activities.name, schema: activities_schema_1.ActivitiesSchema },
                { name: publish_activities_schema_1.PublishActivities.name, schema: publish_activities_schema_1.PublishActivitiesSchema },
            ]),
            platform_express_1.MulterModule.register({}),
            files_module_1.FilesModule,
        ],
        controllers: [activities_controller_1.ActivitiesController],
        providers: [activities_service_1.ActivitiesService],
    })
], ActivitiesModule);
exports.ActivitiesModule = ActivitiesModule;
//# sourceMappingURL=activities.module.js.map