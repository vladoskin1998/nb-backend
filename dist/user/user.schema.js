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
exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const enum_1 = require("../enum/enum");
let User = class User {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: enum_1.ROLES.USER, enum: [enum_1.ROLES.ADMIN, enum_1.ROLES.USER] }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isValidationUser", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: enum_1.METHOD_REGISTRATION.JWT }),
    __metadata("design:type", String)
], User.prototype, "methodRegistration", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: { lat: null, lng: null } }),
    __metadata("design:type", Object)
], User.prototype, "coordinates", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: "" }),
    __metadata("design:type", String)
], User.prototype, "fullName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], User.prototype, "city", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], User.prototype, "country", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], User.prototype, "street", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], User.prototype, "houseNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isLocationVerify", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: new Date() }),
    __metadata("design:type", Date)
], User.prototype, "createdUserDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: new Date() }),
    __metadata("design:type", Date)
], User.prototype, "blockedUserDate", void 0);
User = __decorate([
    (0, mongoose_1.Schema)()
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
//# sourceMappingURL=user.schema.js.map