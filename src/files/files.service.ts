import { Injectable } from '@nestjs/common';
import { accessSync, existsSync, mkdirSync } from 'fs';
import { access, constants, mkdir, unlink, writeFile } from 'fs/promises';
import * as path from 'path';
import { v4 } from 'uuid';

@Injectable()
export class FilesService {
    async uploadSingleFile(
        file: Express.Multer.File,
        dirName?: string,
    ): Promise<string> {
        const dirPath = path.join(__dirname, '../../', dirName || 'uploads');

        console.log('uploadSingleFile', dirPath);
        console.log('uploadSingleFile', dirPath);
        // this.accessDir(dirPath);

        try {
            const fileName = `${file.originalname}.${file.mimetype.split('/')[1]
                }`;
            await writeFile(`${dirPath}/${fileName}`, file.buffer);
            return fileName;
        } catch (error) {
            throw error;
        }
    }

    async deleteFile(fileName: string, dirName: string) {
        const dirPath = path.join(__dirname, '../../', dirName || 'uploads');
        try {
            await unlink(`${dirPath}/${fileName}`);
        } catch (error) {
            throw error;
        }
    }

    async deleteFiles(fileNames: string[], dirName: string) {
        try {
            for (const fileName of fileNames) {
                await this.deleteFile(fileName, dirName);
            }
        } catch (error) {
            throw error;
        }
    }

    async uploadFiles(
        files: Array<Express.Multer.File>,
        dirName?: string,
    ): Promise<Array<string>> {
        const nameFiles: string[] = [];

        await Promise.all(
            files.map(async (file: Express.Multer.File) => {
                try {
                    const fileName = await this.uploadSingleFile(file, dirName);
                    nameFiles.push(fileName);
                } catch (error) {
                    throw error;
                }
            }),
        );

        return nameFiles;
    }

    accessDir(dirPath: string): void {
        console.log("accessDir--->",dirPath);
        
        try {
            const uploadsDir = path.join(__dirname, '../../', 'uploads');
            if (existsSync(uploadsDir)) {
                if (!existsSync(dirPath)) {
                    mkdirSync(dirPath);
                }
                return
            }

            mkdirSync(uploadsDir);
            mkdirSync(dirPath);

        } catch (error) {
            throw error
        }


    }
}
