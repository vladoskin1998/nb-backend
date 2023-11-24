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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserIdentityController = void 0;
const common_1 = require("@nestjs/common");
const user_identity_service_1 = require("./user-identity.service");
const enum_1 = require("../enum/enum");
const platform_express_1 = require("@nestjs/platform-express");
const user_identity_dto_1 = require("./user-identity.dto");
let UserIdentityController = class UserIdentityController {
    constructor(userIdentityService) {
        this.userIdentityService = userIdentityService;
    }
    async getIdentityInforamation(body) {
        console.log("---->", body);
        return await this.userIdentityService.getIdentityInforamation(body === null || body === void 0 ? void 0 : body._id, body.options);
    }
    async profileUploadAvatar(body, file) {
        var _a;
        const userId = (_a = JSON.parse(body.payload)) === null || _a === void 0 ? void 0 : _a._id;
        return await this.userIdentityService.profileUploadAvatar(file, userId);
    }
    async profileUploadCertificates(body, files) {
        var _a, _b;
        const userId = (_a = JSON.parse(body.payload)) === null || _a === void 0 ? void 0 : _a._id;
        const uploadedCertificates = (_b = JSON.parse(body.payload)) === null || _b === void 0 ? void 0 : _b.uploadedCertificates;
        return await this.userIdentityService.profileUploadCertificates(files, userId, uploadedCertificates);
    }
    async profileTextInfo(body) {
        return await this.userIdentityService.profileTextInfo(body);
    }
    async profileIdentity(body) {
        return await this.userIdentityService.profileIdentity(body);
    }
    async logout(body) {
        return await this.userIdentityService.changeLocation(body);
    }
    async getCountriesList(body) {
        return await this.userIdentityService.getCountriesList(body.searchValue);
    }
    async getPopularCountriesList() {
        return this.userIdentityService.getPopularCountriesList();
    }
    async getProfessionList(body) {
        return await this.userIdentityService.getSkillProfInterest(body.searchValue, enum_1.QUALITYENUM.PROFESSION);
    }
    async getPopularProfessionList() {
        console.log();
        return this.userIdentityService.getPopularSkillProfInterest(enum_1.QUALITYENUM.PROFESSION);
    }
    async getInterestsList(body) {
        return await this.userIdentityService.getSkillProfInterest(body.searchValue, enum_1.QUALITYENUM.INTERESTS);
    }
    async getPopularInterestsList() {
        return this.userIdentityService.getPopularSkillProfInterest(enum_1.QUALITYENUM.INTERESTS);
    }
    async getSkillsList(body) {
        return await this.userIdentityService.getSkillProfInterest(body.searchValue, enum_1.QUALITYENUM.SKILLS);
    }
    async getPopularSkillsList() {
        return this.userIdentityService.getPopularSkillProfInterest(enum_1.QUALITYENUM.SKILLS);
    }
};
__decorate([
    (0, common_1.Post)('get-user-identity'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_identity_dto_1.GetUserIdentityDto]),
    __metadata("design:returntype", Promise)
], UserIdentityController.prototype, "getIdentityInforamation", null);
__decorate([
    (0, common_1.Post)('upload-avatar'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserIdentityController.prototype, "profileUploadAvatar", null);
__decorate([
    (0, common_1.Post)('upload-certificates'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], UserIdentityController.prototype, "profileUploadCertificates", null);
__decorate([
    (0, common_1.Post)('profile-text-info'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_identity_dto_1.ProfileTextInfoDTO]),
    __metadata("design:returntype", Promise)
], UserIdentityController.prototype, "profileTextInfo", null);
__decorate([
    (0, common_1.Post)('put-profile-identity'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_identity_dto_1.ProfileSelectDTO]),
    __metadata("design:returntype", Promise)
], UserIdentityController.prototype, "profileIdentity", null);
__decorate([
    (0, common_1.Post)('profile-location'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_identity_dto_1.LocationDto]),
    __metadata("design:returntype", Promise)
], UserIdentityController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('nationality'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserIdentityController.prototype, "getCountriesList", null);
__decorate([
    (0, common_1.Get)('nationality-popular'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserIdentityController.prototype, "getPopularCountriesList", null);
__decorate([
    (0, common_1.Post)('profession'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserIdentityController.prototype, "getProfessionList", null);
__decorate([
    (0, common_1.Get)('profession-popular'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserIdentityController.prototype, "getPopularProfessionList", null);
__decorate([
    (0, common_1.Post)('interests'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserIdentityController.prototype, "getInterestsList", null);
__decorate([
    (0, common_1.Get)('interests-popular'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserIdentityController.prototype, "getPopularInterestsList", null);
__decorate([
    (0, common_1.Post)('skills'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserIdentityController.prototype, "getSkillsList", null);
__decorate([
    (0, common_1.Get)('skills-popular'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserIdentityController.prototype, "getPopularSkillsList", null);
UserIdentityController = __decorate([
    (0, common_1.Controller)('identity'),
    __metadata("design:paramtypes", [user_identity_service_1.UserIdentityService])
], UserIdentityController);
exports.UserIdentityController = UserIdentityController;
//# sourceMappingURL=user-identity.controller.js.map