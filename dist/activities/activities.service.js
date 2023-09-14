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
exports.ActivitiesService = void 0;
const common_1 = require("@nestjs/common");
const files_service_1 = require("../files/files.service");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const activities_schema_1 = require("./activities.schema");
let ActivitiesService = class ActivitiesService {
    constructor(activitiesModel, filesService) {
        this.activitiesModel = activitiesModel;
        this.filesService = filesService;
    }
    async createActivitie({ activitie, files, }) {
        try {
            console.log(files);
            await this.filesService.uploadFiles(files, 'uploads/activities');
            const newCategory = new this.activitiesModel({
                name: activitie.name,
                fileName: activitie.fileName,
            });
            await newCategory.save();
            return newCategory;
        }
        catch (error) {
            throw new Error('ActivitiesService createActivitie' + error.message);
        }
    }
    async getAllActivities() {
        return await this.activitiesModel.find();
    }
    async deleteActivities(idAct) {
        const idActivities = new mongoose_2.Types.ObjectId(idAct);
        try {
            const activitiesFile = await this.activitiesModel.findByIdAndDelete({
                _id: idActivities,
            });
            await this.filesService.deleteFile(activitiesFile.fileName, 'uploads/activities');
            return idActivities;
        }
        catch (error) {
            throw error;
        }
    }
    async visiableActivities({ id, isVisiable, }) {
        const activitiesId = new mongoose_2.Types.ObjectId(id);
        try {
            await this.activitiesModel.findByIdAndUpdate({ _id: activitiesId }, { isVisiable });
            return { id, isVisiable };
        }
        catch (error) {
            throw error;
        }
    }
};
ActivitiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(activities_schema_1.Activities.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        files_service_1.FilesService])
], ActivitiesService);
exports.ActivitiesService = ActivitiesService;
//# sourceMappingURL=activities.service.js.map