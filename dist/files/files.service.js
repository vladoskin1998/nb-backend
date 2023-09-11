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
const promises_1 = require("fs/promises");
const path = require("path");
let FilesService = class FilesService {
    async uploadSingleFile(file, dirName) {
        const dirPath = path.join(__dirname, '../../', dirName || 'upload');
        await this.accessDir(dirPath);
        try {
            const fileName = `${file.originalname}.${file.mimetype.split('/')[1]}`;
            await (0, promises_1.writeFile)(`${dirPath}/${fileName}`, file.buffer);
            return fileName;
        }
        catch (error) {
            throw error;
        }
    }
    async deleteFile(fileName, dirName) {
        const dirPath = path.join(__dirname, '../../', dirName || 'upload');
        try {
            await (0, promises_1.unlink)(`${dirPath}/${fileName}.jpeg`);
        }
        catch (error) {
            throw error;
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
    async uploadFiles(files, dirName) {
        const nameFiles = [];
        await Promise.all(files.map(async (file) => {
            try {
                const fileName = await this.uploadSingleFile(file, dirName);
                nameFiles.push(fileName);
            }
            catch (error) {
                throw error;
            }
        }));
        return nameFiles;
    }
    async accessDir(dirPath) {
        try {
            await (0, promises_1.access)(dirPath, promises_1.constants.R_OK | promises_1.constants.W_OK);
        }
        catch (error) {
            try {
                await (0, promises_1.mkdir)(dirPath);
            }
            catch (error) {
                throw error;
            }
        }
    }
};
FilesService = __decorate([
    (0, common_1.Injectable)()
], FilesService);
exports.FilesService = FilesService;
//# sourceMappingURL=files.service.js.map