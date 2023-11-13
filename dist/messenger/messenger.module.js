"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessengerModule = void 0;
const common_1 = require("@nestjs/common");
const messenger_service_1 = require("./messenger.service");
const messenger_controller_1 = require("./messenger.controller");
const messenger_gateway_1 = require("./messenger.gateway");
const mongoose_1 = require("@nestjs/mongoose");
const chats_schema_1 = require("./chats.schema");
const user_module_1 = require("../user/user.module");
const message_schema_1 = require("./message.schema");
const user_schema_1 = require("../user/user.schema");
const user_identity_schema_1 = require("../user-identity/user-identity.schema");
const files_module_1 = require("../files/files.module");
const notification_module_1 = require("../notification/notification.module");
let MessengerModule = class MessengerModule {
};
MessengerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: chats_schema_1.Chats.name, schema: chats_schema_1.ChatsSchema },
                { name: message_schema_1.Message.name, schema: message_schema_1.MessageSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: user_identity_schema_1.UserIdentity.name, schema: user_identity_schema_1.UserIdentitySchema },
            ]),
            user_module_1.UserModule,
            files_module_1.FilesModule,
            notification_module_1.NotificationModule,
        ],
        controllers: [messenger_controller_1.MessengerController],
        providers: [messenger_service_1.MessengerService, messenger_gateway_1.MessengerGateway]
    })
], MessengerModule);
exports.MessengerModule = MessengerModule;
//# sourceMappingURL=messenger.module.js.map