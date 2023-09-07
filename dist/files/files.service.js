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
const uuid_1 = require("uuid");
let FilesService = class FilesService {
    async uploadFiles(files, dirName) {
        const dirPath = path.join(__dirname, '../../', dirName || 'upload');
        const nameFiles = [];
        await this.accessDir(dirPath);
        await Promise.all(files.map(async (file) => {
            try {
                const fileName = `${(0, uuid_1.v4)()}.${file.mimetype.split('/')[1]}`;
                nameFiles.push(fileName);
                await (0, promises_1.writeFile)(`${dirPath}/${fileName}`, file.buffer);
                return true;
            }
            catch (error) {
                throw error;
            }
        }));
        return nameFiles;
    }
    async deleteFiles(files, dirName) {
        const dirPath = path.join(__dirname, '../../', dirName || 'upload');
        await Promise.all(files.map(async (fileName) => {
            try {
                await (0, promises_1.unlink)(`${dirPath}/${fileName}`);
                return true;
            }
            catch (error) {
                throw error;
            }
        }));
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