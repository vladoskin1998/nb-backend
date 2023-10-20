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
const user_module_1 = require("./user/user.module");
const category_module_1 = require("./category/category.module");
const serve_static_1 = require("@nestjs/serve-static");
const activities_module_1 = require("./activities/activities.module");
const user_identity_module_1 = require("./user-identity/user-identity.module");
const messenger_module_1 = require("./messenger/messenger.module");
const statistics_module_1 = require("./statistics/statistics.module");
const posts_module_1 = require("./posts/posts.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true, envFilePath: path.join(__dirname, '.env') }),
            serve_static_1.ServeStaticModule.forRoot({
                serveRoot: "/uploads",
                rootPath: path.join(__dirname, '..', 'uploads'),
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: path.join(__dirname, '..', 'build')
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => {
                    const uri = configService.get('MONGO_LINK');
                    const appEnv = configService.get('APP_ENV');
                    console.log(uri);
                    return {
                        uri,
                        dbName: appEnv === 'DEV' ? 'jfit' : 'nb_hb'
                    };
                },
            }),
            auth_module_1.AuthModule,
            files_module_1.FilesModule,
            user_module_1.UserModule,
            category_module_1.CategoryModule,
            activities_module_1.ActivitiesModule,
            user_identity_module_1.UserIdentityModule,
            messenger_module_1.MessengerModule,
            statistics_module_1.StatisticsModule,
            posts_module_1.PostsModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map