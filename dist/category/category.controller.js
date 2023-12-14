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
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const category_service_1 = require("./category.service");
const category_dto_1 = require("./category.dto");
const platform_express_1 = require("@nestjs/platform-express");
let CategoryController = class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    async addCategorie(file, body) {
        const payload = JSON.parse(body.payload);
        return await this.categoryService.createOrUpdateCategorie({ file, payload });
    }
    async addSubCategorie(file, body) {
        const payload = JSON.parse(body.payload);
        return await this.categoryService.createOrUpdateSubCategorie({ file, payload });
    }
    async allCategories() {
        return await this.categoryService.getAllCategories();
    }
    async allSubCategorie({ id }) {
        return await this.categoryService.getSubCategories(id);
    }
    async moveSubCategory(dto) {
        return await this.categoryService.moveSubcategory(dto);
    }
    async visiableCategory(dto) {
        return await this.categoryService.visiableCategory(dto);
    }
    async visiableSubCategory(dto) {
        return await this.categoryService.visiableSubCategory(dto);
    }
    async deleteCategory({ categiryId }) {
        return await this.categoryService.deleteCategory(categiryId);
    }
    async deleteSubCategory({ subCategiryId }) {
        return await this.categoryService.deleteSubCategory(subCategiryId);
    }
    async deletePublishCategory({ publishCategiryId }) {
        return await this.categoryService.deleteSubCategory(publishCategiryId);
    }
    async addPost(body, files) {
        const payload = JSON.parse(body.payload);
        return await this.categoryService.addPublishServices({ files, payload });
    }
    async getPosts(body) {
        return await this.categoryService.getPublishServices(body);
    }
    async getTenPosts() {
        return await this.categoryService.getTenPublishServices();
    }
    async getOnePublishService(body) {
        return await this.categoryService.getOnePublishService(body);
    }
};
__decorate([
    (0, common_1.Post)('add-categorie'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "addCategorie", null);
__decorate([
    (0, common_1.Post)('add-sub-categorie'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "addSubCategorie", null);
__decorate([
    (0, common_1.Get)('all-categories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "allCategories", null);
__decorate([
    (0, common_1.Get)('sub-categories'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_dto_1.IDDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "allSubCategorie", null);
__decorate([
    (0, common_1.Post)('move-subcategory'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_dto_1.MoveSubCategoryIDDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "moveSubCategory", null);
__decorate([
    (0, common_1.Post)('visiable-category'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_dto_1.VisiableDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "visiableCategory", null);
__decorate([
    (0, common_1.Post)('visiable-subcategory'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_dto_1.VisiableDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "visiableSubCategory", null);
__decorate([
    (0, common_1.Post)('delete-category'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_dto_1.CategoryIDDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteCategory", null);
__decorate([
    (0, common_1.Post)('delete-subcategory'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_dto_1.SubCategoryIDDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteSubCategory", null);
__decorate([
    (0, common_1.Post)('delete-publish-category'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_dto_1.PublishCategoryIDDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deletePublishCategory", null);
__decorate([
    (0, common_1.Post)('add-publish-service'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "addPost", null);
__decorate([
    (0, common_1.Post)('get-publish-service'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_dto_1.GetPublishServiceDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getPosts", null);
__decorate([
    (0, common_1.Post)('get-ten-publish-service'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getTenPosts", null);
__decorate([
    (0, common_1.Post)('get-one-publish-service'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_dto_1.GetOnePublishDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getOnePublishService", null);
CategoryController = __decorate([
    (0, common_1.Controller)('categories'),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryController);
exports.CategoryController = CategoryController;
//# sourceMappingURL=category.controller.js.map