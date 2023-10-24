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
exports.UserIdentitySchema = exports.UserIdentity = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const enum_1 = require("../enum/enum");
const mongoose_2 = require("mongoose");
const user_profession_schema_1 = require("./user-profession.schema");
const user_interests_schema_1 = require("./user-interests.schema");
const user_skills_schema_1 = require("./user-skills.schema");
const user_schema_1 = require("../user/user.schema");
let UserIdentity = class UserIdentity {
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: user_schema_1.User.name }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], UserIdentity.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], UserIdentity.prototype, "isLocationVerify", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], UserIdentity.prototype, "isGotAllProfileInfo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: { lat: null, lng: null } }),
    __metadata("design:type", Object)
], UserIdentity.prototype, "coordinates", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], UserIdentity.prototype, "city", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], UserIdentity.prototype, "country", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], UserIdentity.prototype, "street", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], UserIdentity.prototype, "houseNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: new Date() }),
    __metadata("design:type", Date)
], UserIdentity.prototype, "createdUserDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", Date)
], UserIdentity.prototype, "blockedUserDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], UserIdentity.prototype, "avatarFileName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 5 }),
    __metadata("design:type", Number)
], UserIdentity.prototype, "step", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: enum_1.PRIVACY.EVERYONE, enum: enum_1.PRIVACY }),
    __metadata("design:type", String)
], UserIdentity.prototype, "privacy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: "" }),
    __metadata("design:type", String)
], UserIdentity.prototype, "aboutMe", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", Date)
], UserIdentity.prototype, "dateBirth", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], UserIdentity.prototype, "cityBirth", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Array }),
    __metadata("design:type", Array)
], UserIdentity.prototype, "certificatesFileName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], UserIdentity.prototype, "sex", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: enum_1.ORIENTATION.HETERO, enum: enum_1.ORIENTATION }),
    __metadata("design:type", String)
], UserIdentity.prototype, "orientation", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], UserIdentity.prototype, "education", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], UserIdentity.prototype, "studySchool", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], UserIdentity.prototype, "familyStatus", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: [] }),
    __metadata("design:type", Array)
], UserIdentity.prototype, "nationality", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: user_profession_schema_1.UserProfession.name }], default: null }),
    __metadata("design:type", Array)
], UserIdentity.prototype, "profession", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: user_interests_schema_1.UserInterests.name }], default: null }),
    __metadata("design:type", Array)
], UserIdentity.prototype, "interests", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: user_skills_schema_1.UserSkills.name }], default: null }),
    __metadata("design:type", Array)
], UserIdentity.prototype, "skills", void 0);
UserIdentity = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false })
], UserIdentity);
exports.UserIdentity = UserIdentity;
exports.UserIdentitySchema = mongoose_1.SchemaFactory.createForClass(UserIdentity);
//# sourceMappingURL=user-identity.schema.js.map