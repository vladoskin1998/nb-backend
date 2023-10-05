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
exports.ChangePasswordDTO = exports.UserTextInfoDTO = exports.GetUsers = exports.IDUserDto = void 0;
const class_validator_1 = require("class-validator");
const enum_1 = require("../enum/enum");
class IDUserDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IDUserDto.prototype, "_id", void 0);
exports.IDUserDto = IDUserDto;
class GetUsers extends IDUserDto {
    constructor() {
        super(...arguments);
        this.role = enum_1.ROLES.ALLUSERS;
    }
}
__decorate([
    (0, class_validator_1.IsEnum)(enum_1.ROLES),
    __metadata("design:type", String)
], GetUsers.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetUsers.prototype, "searchName", void 0);
exports.GetUsers = GetUsers;
class UserTextInfoDTO {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserTextInfoDTO.prototype, "_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserTextInfoDTO.prototype, "fullName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UserTextInfoDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enum_1.ROLES),
    __metadata("design:type", String)
], UserTextInfoDTO.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserTextInfoDTO.prototype, "phone", void 0);
exports.UserTextInfoDTO = UserTextInfoDTO;
class ChangePasswordDTO {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChangePasswordDTO.prototype, "_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChangePasswordDTO.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChangePasswordDTO.prototype, "newPassword1", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChangePasswordDTO.prototype, "newPassword2", void 0);
exports.ChangePasswordDTO = ChangePasswordDTO;
//# sourceMappingURL=user.dto.js.map