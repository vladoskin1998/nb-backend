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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const category_schema_1 = require("./category.schema");
const files_service_1 = require("../files/files.service");
let CategoryService = class CategoryService {
    constructor(categoryModel, subCategoryModel, filesService) {
        this.categoryModel = categoryModel;
        this.subCategoryModel = subCategoryModel;
        this.filesService = filesService;
    }
    async createCategory({ category, subCategory, files, }) {
        try {
            await this.filesService.uploadFiles(files, 'uploads/categories');
            const newCategory = new this.categoryModel({
                name: category.name,
                fileName: category.id,
            });
            if (subCategory && subCategory.listSubCategory.length > 0) {
                const subCategoriesArr = subCategory.listSubCategory.map((it) => ({
                    name: it.name,
                    fileName: it.id,
                }));
                const newSubCategory = new this.subCategoryModel(subCategoriesArr);
                newSubCategory.category = newCategory._id;
                await Promise.all([newCategory.save(), newSubCategory.save()]);
            }
            else {
                await newCategory.save();
            }
            return newCategory;
        }
        catch (error) {
            throw new Error('CategoryService createCategory' + error.message);
        }
    }
    async getAllCategories() {
        try {
            return await this.categoryModel.find().select('-fileName');
        }
        catch (error) {
            throw new Error('CategoryService getAllCategories' + error.message);
        }
    }
    async getSubCategories(categoryId) {
        try {
            await this.categoryModel.findOneAndUpdate({ _id: categoryId }, { $inc: { numberView: 1 } });
            return await this.subCategoryModel.find({
                category: new mongoose_1.Types.ObjectId(categoryId),
            });
        }
        catch (error) {
            throw new Error('CategoryService getSubCategories' + error.message);
        }
    }
    async deleteCategory(categoryId) {
        try {
            await this.subCategoryModel.deleteMany({ category: categoryId });
            await this.categoryModel.findByIdAndDelete({ _id: categoryId });
            return categoryId;
        }
        catch (error) { }
    }
    async deleteSubCategory(id) { }
};
CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(category_schema_1.Category.name)),
    __param(1, (0, mongoose_2.InjectModel)(category_schema_1.SubCategory.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        files_service_1.FilesService])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map