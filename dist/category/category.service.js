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
const enum_1 = require("../enum/enum");
const publish_service_schema_1 = require("./publish-service.schema");
const notification_service_1 = require("../notification/notification.service");
let CategoryService = class CategoryService {
    constructor(categoryModel, subCategoryModel, publishServiceModel, filesService, notificationService) {
        this.categoryModel = categoryModel;
        this.subCategoryModel = subCategoryModel;
        this.publishServiceModel = publishServiceModel;
        this.filesService = filesService;
        this.notificationService = notificationService;
    }
    async createOrUpdateCategorie({ payload, file }) {
        try {
            if (payload === null || payload === void 0 ? void 0 : payload.categorieId) {
                const categorieId = new mongoose_1.Types.ObjectId(payload.categorieId);
                const categorie = await this.categoryModel.findOne({ _id: categorieId });
                if (file) {
                    await this.filesService.deleteFile(categorie.fileName, 'uploads/categories');
                    const fileName = await this.filesService.uploadSingleFile(file, 'uploads/categories', false);
                    await categorie.updateOne({ fileName });
                }
                if (payload === null || payload === void 0 ? void 0 : payload.name) {
                    await categorie.updateOne({ name: payload === null || payload === void 0 ? void 0 : payload.name });
                }
                return categorie;
            }
            const fileName = await this.filesService.uploadSingleFile(file, 'uploads/categories', false);
            return await this.categoryModel.create({ fileName, name: payload.name });
        }
        catch (e) {
        }
    }
    async createOrUpdateSubCategorie({ payload, file }) {
        try {
            if (payload === null || payload === void 0 ? void 0 : payload.subCategorieId) {
                const subCategorieId = new mongoose_1.Types.ObjectId(payload.subCategorieId);
                const subCategorie = await this.subCategoryModel.findOne({ _id: subCategorieId });
                if (file) {
                    await this.filesService.deleteFile(subCategorie.fileName, 'uploads/categories');
                    const fileName = await this.filesService.uploadSingleFile(file, 'uploads/categories', false);
                    await subCategorie.updateOne({ fileName });
                }
                if (payload === null || payload === void 0 ? void 0 : payload.name) {
                    await subCategorie.updateOne({ name: payload === null || payload === void 0 ? void 0 : payload.name });
                }
                return subCategorie;
            }
            const fileName = await this.filesService.uploadSingleFile(file, 'uploads/categories', false);
            const categoryId = new mongoose_1.Types.ObjectId(payload === null || payload === void 0 ? void 0 : payload.categorieId);
            return await this.subCategoryModel.create({ fileName, name: payload.name, categoryId });
        }
        catch (e) {
        }
    }
    async getAllCategories() {
        try {
            let allCategories = await this.categoryModel.find();
            return allCategories.map(category => (Object.assign(Object.assign({}, category.toObject()), { categoryId: category._id.toString() })));
        }
        catch (error) {
            throw new Error('CategoryService getAllCategories' + error.message);
        }
    }
    async getSubCategories(categoryId) {
        try {
            await this.categoryModel.findOneAndUpdate({ _id: categoryId }, { $inc: { numberView: 1 } });
            let allSubCategories = await this.subCategoryModel.find({
                categoryId: new mongoose_1.Types.ObjectId(categoryId),
            });
            return allSubCategories.map(subCategory => (Object.assign(Object.assign({}, subCategory.toObject()), { subCategoryId: subCategory._id.toString() })));
        }
        catch (error) {
            throw new Error('CategoryService getSubCategories' + error.message);
        }
    }
    async deleteCategory(catId) {
        const categoryId = new mongoose_1.Types.ObjectId(catId);
        try {
            const subFileNames = await this.subCategoryModel.find({ categoryId }).select('fileName');
            const publishFileNames = await this.publishServiceModel.find({ servicesId: categoryId }).select('filesName');
            const deletedPublishFiles = publishFileNames.map((item) => item === null || item === void 0 ? void 0 : item.filesName).flat(1);
            await this.filesService.deleteFiles(deletedPublishFiles, 'uploads/publish_services');
            const catFile = await this.categoryModel.findByIdAndDelete({ _id: catId });
            const deletedFiles = subFileNames.map((item) => item === null || item === void 0 ? void 0 : item.fileName);
            deletedFiles.push(catFile.fileName);
            await this.filesService.deleteFiles(deletedFiles, 'uploads/categories');
            await this.subCategoryModel.deleteMany({ categoryId });
            await this.publishServiceModel.deleteMany({ servicesId: categoryId });
            return catId;
        }
        catch (error) {
            throw error;
        }
    }
    async deleteSubCategory(subCatId) {
        const subCategoryId = new mongoose_1.Types.ObjectId(subCatId);
        try {
            const subCatFile = await this.subCategoryModel.findByIdAndDelete({
                _id: subCategoryId,
            });
            const publishFileNames = await this.publishServiceModel.find({ subServicesId: subCatId }).select('filesName');
            const deletedPublishFiles = publishFileNames.map((item) => item === null || item === void 0 ? void 0 : item.filesName).flat(1);
            await this.filesService.deleteFiles(deletedPublishFiles, 'uploads/publish_services');
            await this.filesService.deleteFile(subCatFile.fileName, 'uploads/categories');
            await this.publishServiceModel.deleteMany({ subServicesId: subCatId });
            return subCategoryId;
        }
        catch (error) {
            throw error;
        }
    }
    async deletePublishCategory(pubCategiryId) {
        const publishCategiryId = new mongoose_1.Types.ObjectId(pubCategiryId);
        try {
            const publishFileNames = await this.publishServiceModel.findByIdAndDelete({
                _id: publishCategiryId,
            });
            await this.filesService.deleteFiles(publishFileNames.filesName, 'uploads/publish_services');
            return publishCategiryId;
        }
        catch (error) {
            throw error;
        }
    }
    async moveSubcategory({ newCategoryId, subCategiryId }) {
        try {
            const categoryId = new mongoose_1.Types.ObjectId(newCategoryId);
            const _id = new mongoose_1.Types.ObjectId(subCategiryId);
            await this.subCategoryModel.findByIdAndUpdate({ _id }, { categoryId });
        }
        catch (error) {
            throw error;
        }
    }
    async visiableCategory({ id, isVisiable, }) {
        const categoryId = new mongoose_1.Types.ObjectId(id);
        try {
            await this.categoryModel.findByIdAndUpdate({ _id: categoryId }, { isVisiable });
            return { id, isVisiable };
        }
        catch (error) {
            throw error;
        }
    }
    async visiableSubCategory({ id, isVisiable, }) {
        const subCategoryId = new mongoose_1.Types.ObjectId(id);
        try {
            await this.subCategoryModel.findByIdAndUpdate({ _id: subCategoryId }, { isVisiable });
            return { id, isVisiable };
        }
        catch (error) {
            throw error;
        }
    }
    async addPublishServices({ payload, files }) {
        try {
            const userId = new mongoose_1.Types.ObjectId(payload.userId);
            const userIdentityId = new mongoose_1.Types.ObjectId(payload.userIdentityId);
            const servicesId = new mongoose_1.Types.ObjectId(payload.servicesId);
            const subServicesId = new mongoose_1.Types.ObjectId(payload.subServicesId);
            const filesName = await this.filesService.uploadFiles(files, 'uploads/publish_services', false);
            await this.notificationService.sendNotificationBroadcast({
                ownerId: payload.userId,
                ownerIdentityId: payload.userIdentityId,
                title: payload.text,
                name: payload.title,
                fileName: filesName[0],
                event: enum_1.NOTIFICATION_EVENT.NOTIFICATION_SERVICE
            });
            return await this.publishServiceModel.create(Object.assign(Object.assign({}, payload), { filesName, userId, userIdentityId, servicesId, subServicesId }));
        }
        catch (error) {
        }
    }
    async getPublishServices(body) {
        const pageSize = 20;
        const allPageNumber = Math.ceil((await this.publishServiceModel.countDocuments()) / pageSize);
        const subServicesId = new mongoose_1.Types.ObjectId(body.subServicesId);
        const skip = (body.pageNumber - 1) * pageSize;
        const publishServices = await this.publishServiceModel
            .find({ subServicesId })
            .skip(skip)
            .limit(pageSize)
            .sort({ createdPublishServiceDate: -1 })
            .populate({
            path: 'userId',
            select: 'fullName',
        })
            .populate({
            path: 'userIdentityId',
            select: 'avatarFileName',
        })
            .exec();
        return { publishServices, allPageNumber };
    }
};
CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(category_schema_1.Category.name)),
    __param(1, (0, mongoose_2.InjectModel)(category_schema_1.SubCategory.name)),
    __param(2, (0, mongoose_2.InjectModel)(publish_service_schema_1.PublishService.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        files_service_1.FilesService,
        notification_service_1.NotificationService])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map