"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const promises_1 = require("fs/promises");
const path = require("path");
const uuid_1 = require("uuid");
let FilesService = class FilesService {
    async uploadSingleFile(file, dirName, isOriginalFileName = true) {
        const dirPath = path.join(__dirname, '../../', dirName || 'uploads');
        this.accessDir(dirPath);
        try {
            const mimoType = file.mimetype.split('/')[1];
            let name = file.originalname;
            if (!isOriginalFileName) {
                name = (0, uuid_1.v4)();
            }
            const fileName = `${name}.${mimoType}`;
            await (0, promises_1.writeFile)(path.join(dirPath, fileName), file.buffer);
            return fileName;
        }
        catch (error) {
            throw error;
        }
    }
    async deleteFile(fileName, dirName) {
        const dirPath = path.join(__dirname, '../../', dirName || 'uploads');
        try {
            await (0, promises_1.unlink)(`${dirPath}/${fileName}`);
        }
        catch (error) {
            return fileName;
        }
    }
    async deleteFiles(fileNames, dirName) {
        try {
            for (const fileName of fileNames) {
                await this.deleteFile(fileName, dirName);
            }
        }
        catch (error) {
            throw error;
        }
    }
    async uploadFiles(files, dirName, isOriginalFileName = true) {
        const nameFiles = [];
        await Promise.all(files.map(async (file) => {
            try {
                const fileName = await this.uploadSingleFile(file, dirName, isOriginalFileName);
                nameFiles.push(fileName);
            }
            catch (error) {
                throw error;
            }
        }));
        return nameFiles;
    }
    accessDir(dirPath) {
        console.log("accessDir--->", dirPath);
        try {
            const uploadsDir = path.join(__dirname, '../../', 'uploads');
            if ((0, fs_1.existsSync)(uploadsDir)) {
                if (!(0, fs_1.existsSync)(dirPath)) {
                    (0, fs_1.mkdirSync)(dirPath);
                }
                return;
            }
            (0, fs_1.mkdirSync)(uploadsDir);
            (0, fs_1.mkdirSync)(dirPath);
        }
        catch (error) {
            throw error;
        }
    }
};
FilesService = __decorate([
    (0, common_1.Injectable)()
], FilesService);
exports.FilesService = FilesService;
//# sourceMappingURL=files.service.js.map