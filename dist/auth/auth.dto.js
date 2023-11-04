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
exports.ChangePAsswordDTO = exports.RegenerateCodeEmailDTO = exports.ConfirmCodeEmailDTO = exports.RegistrationDto = exports.AuthDto = exports.EmailDTO = void 0;
const class_validator_1 = require("class-validator");
const enum_1 = require("../enum/enum");
class EmailDTO {
}
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], EmailDTO.prototype, "email", void 0);
exports.EmailDTO = EmailDTO;
class AuthDto extends EmailDTO {
    constructor() {
        super(...arguments);
        this.role = enum_1.ROLES.USER;
        this.methodRegistration = enum_1.METHOD_REGISTRATION.JWT;
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enum_1.ROLES),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AuthDto.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enum_1.METHOD_REGISTRATION),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AuthDto.prototype, "methodRegistration", void 0);
exports.AuthDto = AuthDto;
class RegistrationDto extends AuthDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegistrationDto.prototype, "fullName", void 0);
exports.RegistrationDto = RegistrationDto;
class ConfirmCodeEmailDTO extends EmailDTO {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ConfirmCodeEmailDTO.prototype, "code", void 0);
exports.ConfirmCodeEmailDTO = ConfirmCodeEmailDTO;
class RegenerateCodeEmailDTO extends EmailDTO {
}
__decorate([
    (0, class_validator_1.IsEnum)(enum_1.METHOD_FORGET_PASSWORD),
    __metadata("design:type", String)
], RegenerateCodeEmailDTO.prototype, "sendMethod", void 0);
exports.RegenerateCodeEmailDTO = RegenerateCodeEmailDTO;
class ChangePAsswordDTO extends EmailDTO {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChangePAsswordDTO.prototype, "oldPassword", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChangePAsswordDTO.prototype, "hashPassword", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChangePAsswordDTO.prototype, "newPassword", void 0);
exports.ChangePAsswordDTO = ChangePAsswordDTO;
//# sourceMappingURL=auth.dto.js.map