"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./user.schema");
const auth_module_1 = require("../auth/auth.module");
const platform_express_1 = require("@nestjs/platform-express");
const user_identity_schema_1 = require("../user-identity/user-identity.schema");
const friends_schema_1 = require("./friends.schema");
const files_module_1 = require("../files/files.module");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: user_identity_schema_1.UserIdentity.name, schema: user_identity_schema_1.UserIdentitySchema },
                { name: friends_schema_1.Friends.name, schema: friends_schema_1.FriendsSchema },
            ]),
            platform_express_1.MulterModule.register({}),
            auth_module_1.AuthModule,
            files_module_1.FilesModule,
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService],
        exports: [user_service_1.UserService]
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map