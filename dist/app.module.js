"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const path = require("path");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("./auth/auth.module");
const files_module_1 = require("./files/files.module");
const platform_express_1 = require("@nestjs/platform-express");
const enum_1 = require("./enum/enum");
const user_module_1 = require("./user/user.module");
const envPath = path.resolve(__dirname, '..', '.env');
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ envFilePath: envPath, isGlobal: true }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => {
                    const uri = configService.get('MONGO_LINK');
                    console.log(uri);
                    return {
                        uri,
                        dbName: 'jfit'
                    };
                },
            }),
            platform_express_1.MulterModule.register({
                limits: {
                    fileSize: 1000000000,
                },
                fileFilter: (req, file, cb) => {
                    if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png|mp4)$/)) {
                        return cb(new Error(enum_1.ERROR_MESSAGE.ERROR_FILE_EXTENSION), false);
                    }
                    cb(null, true);
                },
            }),
            auth_module_1.AuthModule,
            files_module_1.FilesModule,
            user_module_1.UserModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map