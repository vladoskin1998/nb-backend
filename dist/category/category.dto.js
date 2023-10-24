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
exports.GetPublishServiceDto = exports.SubCategoryListDto = exports.EditDto = exports.CategoryDto = exports.VisiableDto = exports.MoveSubCategoryIDDto = exports.PublishCategoryIDDto = exports.SubCategoryIDDto = exports.CategoryIDDto = exports.IDDto = void 0;
const class_validator_1 = require("class-validator");
class IDDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IDDto.prototype, "id", void 0);
exports.IDDto = IDDto;
class CategoryIDDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CategoryIDDto.prototype, "categiryId", void 0);
exports.CategoryIDDto = CategoryIDDto;
class SubCategoryIDDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubCategoryIDDto.prototype, "subCategiryId", void 0);
exports.SubCategoryIDDto = SubCategoryIDDto;
class PublishCategoryIDDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PublishCategoryIDDto.prototype, "publishCategiryId", void 0);
exports.PublishCategoryIDDto = PublishCategoryIDDto;
class MoveSubCategoryIDDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MoveSubCategoryIDDto.prototype, "newCategoryId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MoveSubCategoryIDDto.prototype, "subCategiryId", void 0);
exports.MoveSubCategoryIDDto = MoveSubCategoryIDDto;
class VisiableDto extends IDDto {
}
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], VisiableDto.prototype, "isVisiable", void 0);
exports.VisiableDto = VisiableDto;
class CategoryDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CategoryDto.prototype, "fileName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CategoryDto.prototype, "name", void 0);
exports.CategoryDto = CategoryDto;
class EditDto extends IDDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EditDto.prototype, "name", void 0);
exports.EditDto = EditDto;
class SubCategoryListDto {
}
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", Array)
], SubCategoryListDto.prototype, "listSubCategory", void 0);
exports.SubCategoryListDto = SubCategoryListDto;
class GetPublishServiceDto {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GetPublishServiceDto.prototype, "pageNumber", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Number)
], GetPublishServiceDto.prototype, "subServicesId", void 0);
exports.GetPublishServiceDto = GetPublishServiceDto;
//# sourceMappingURL=category.dto.js.map