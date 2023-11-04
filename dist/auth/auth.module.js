"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const mongoose_1 = require("@nestjs/mongoose");
const auth_schema_1 = require("./auth.schema");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const google_auth_service_1 = require("./google-auth.service");
const fb_auth_service_1 = require("./fb-auth.service");
const jwt_auth_service_1 = require("./jwt-auth.service");
const user_schema_1 = require("../user/user.schema");
const mail_module_1 = require("../mailer/mail.module");
const sms_module_1 = require("../sms/sms.module");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            mongoose_1.MongooseModule.forFeature([
                { name: auth_schema_1.Authentication.name, schema: auth_schema_1.AuthenticationSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
            ]),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => {
                    const secret = configService.get('JWT_SECRET');
                    return {
                        secret,
                    };
                },
            }),
            mail_module_1.MailModule,
            sms_module_1.SmsModule
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService,
            google_auth_service_1.GoogleStrategy,
            fb_auth_service_1.FacebookStrategy,
            jwt_auth_service_1.JwtTokenService,
        ],
        exports: [
            jwt_auth_service_1.JwtTokenService
        ]
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map