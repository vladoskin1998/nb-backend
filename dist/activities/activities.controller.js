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
exports.ActivitiesController = void 0;
const common_1 = require("@nestjs/common");
const activities_service_1 = require("./activities.service");
const platform_express_1 = require("@nestjs/platform-express");
const category_dto_1 = require("../category/category.dto");
let ActivitiesController = class ActivitiesController {
    constructor(activitiesService) {
        this.activitiesService = activitiesService;
    }
    async addActivitie(files, body) {
        const { activitie, } = JSON.parse(body.payload);
        return await this.activitiesService.createActivitie({ activitie, files });
    }
    async allActivities() {
        return await this.activitiesService.getAllActivities();
    }
    async deleteCategory({ id }) {
        return await this.activitiesService.deleteActivities(id);
    }
    async visiableCategory(dto) {
        return await this.activitiesService.visiableActivities(dto);
    }
    async getPost() {
    }
    async addPost(body, files) {
        const payload = JSON.parse(body.payload);
        return await this.activitiesService.addPublishActivities({ files, payload });
    }
};
__decorate([
    (0, common_1.Post)('add-activitie'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files')),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], ActivitiesController.prototype, "addActivitie", null);
__decorate([
    (0, common_1.Get)('all-activities'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ActivitiesController.prototype, "allActivities", null);
__decorate([
    (0, common_1.Post)('delete-activities'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_dto_1.IDDto]),
    __metadata("design:returntype", Promise)
], ActivitiesController.prototype, "deleteCategory", null);
__decorate([
    (0, common_1.Post)('visiable-activities'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_dto_1.VisiableDto]),
    __metadata("design:returntype", Promise)
], ActivitiesController.prototype, "visiableCategory", null);
__decorate([
    (0, common_1.Post)('get-publish-activities'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ActivitiesController.prototype, "getPost", null);
__decorate([
    (0, common_1.Post)('add-publish-activities'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], ActivitiesController.prototype, "addPost", null);
ActivitiesController = __decorate([
    (0, common_1.Controller)('activities'),
    __metadata("design:paramtypes", [activities_service_1.ActivitiesService])
], ActivitiesController);
exports.ActivitiesController = ActivitiesController;
//# sourceMappingURL=activities.controller.js.map