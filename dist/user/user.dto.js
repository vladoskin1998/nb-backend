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
exports.ProfileTextInfoDTO = exports.LocationDto = exports.IDUserDto = exports.GetUsers = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const enum_1 = require("../enum/enum");
const utils_1 = require("../utils/utils");
class Coordinars {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Coordinars.prototype, "lat", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Coordinars.prototype, "lng", void 0);
class GetUsers {
    constructor() {
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
class IDUserDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IDUserDto.prototype, "_id", void 0);
exports.IDUserDto = IDUserDto;
class LocationDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LocationDto.prototype, "_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LocationDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LocationDto.prototype, "country", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LocationDto.prototype, "street", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LocationDto.prototype, "houseNumber", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => Coordinars),
    __metadata("design:type", Coordinars)
], LocationDto.prototype, "coordinates", void 0);
exports.LocationDto = LocationDto;
class ProfileTextInfoDTO {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProfileTextInfoDTO.prototype, "_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ProfileTextInfoDTO.prototype, "interestZone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enum_1.PRIVACY),
    __metadata("design:type", String)
], ProfileTextInfoDTO.prototype, "privacy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProfileTextInfoDTO.prototype, "aboutMe", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Validate)(utils_1.isDateOrString),
    __metadata("design:type", Date)
], ProfileTextInfoDTO.prototype, "dateBirth", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProfileTextInfoDTO.prototype, "cityBirth", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enum_1.SEX),
    __metadata("design:type", String)
], ProfileTextInfoDTO.prototype, "sex", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enum_1.ORIENTATION),
    __metadata("design:type", String)
], ProfileTextInfoDTO.prototype, "orientation", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enum_1.ORIENTATION),
    __metadata("design:type", String)
], ProfileTextInfoDTO.prototype, "education", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enum_1.FAMILYSTATUS),
    __metadata("design:type", String)
], ProfileTextInfoDTO.prototype, "familyStatus", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.Validate)(utils_1.isValidNationality),
    __metadata("design:type", Array)
], ProfileTextInfoDTO.prototype, "nationality", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", Array)
], ProfileTextInfoDTO.prototype, "profession", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", Array)
], ProfileTextInfoDTO.prototype, "interests", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", Array)
], ProfileTextInfoDTO.prototype, "skills", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], ProfileTextInfoDTO.prototype, "certificatesFileName", void 0);
exports.ProfileTextInfoDTO = ProfileTextInfoDTO;
//# sourceMappingURL=user.dto.js.map