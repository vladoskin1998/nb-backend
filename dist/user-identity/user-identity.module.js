"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserIdentityModule = void 0;
const common_1 = require("@nestjs/common");
const user_identity_service_1 = require("./user-identity.service");
const user_identity_controller_1 = require("./user-identity.controller");
const user_profession_schema_1 = require("./user-profession.schema");
const user_interests_schema_1 = require("./user-interests.schema");
const user_skills_schema_1 = require("./user-skills.schema");
const mongoose_1 = require("@nestjs/mongoose");
const files_module_1 = require("../files/files.module");
const user_identity_schema_1 = require("./user-identity.schema");
let UserIdentityModule = class UserIdentityModule {
};
UserIdentityModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: user_identity_schema_1.UserIdentity.name, schema: user_identity_schema_1.UserIdentitySchema },
                { name: user_profession_schema_1.UserProfession.name, schema: user_profession_schema_1.UserProfessionSchema },
                { name: user_interests_schema_1.UserInterests.name, schema: user_interests_schema_1.UserInterestsSchema },
                { name: user_skills_schema_1.UserSkills.name, schema: user_skills_schema_1.UserSkillsSchema },
            ]),
            files_module_1.FilesModule,
        ],
        controllers: [user_identity_controller_1.UserIdentityController],
        providers: [user_identity_service_1.UserIdentityService],
        exports: [
            user_identity_service_1.UserIdentityService
        ]
    })
], UserIdentityModule);
exports.UserIdentityModule = UserIdentityModule;
//# sourceMappingURL=user-identity.module.js.map