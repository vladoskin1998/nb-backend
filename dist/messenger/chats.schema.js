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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatsSchema = exports.Chats = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../user/user.schema");
let Chats = class Chats {
};
__decorate([
    (0, mongoose_1.Prop)({ type: [
            {
                userId: { type: mongoose_2.Types.ObjectId, ref: user_schema_1.User.name },
            }
        ] }),
    __metadata("design:type", Array)
], Chats.prototype, "participants", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Chats.prototype, "isSupport", void 0);
Chats = __decorate([
    (0, mongoose_1.Schema)()
], Chats);
exports.Chats = Chats;
exports.ChatsSchema = mongoose_1.SchemaFactory.createForClass(Chats);
//# sourceMappingURL=chats.schema.js.map