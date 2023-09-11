/// <reference types="multer" />
export declare class FilesService {
    uploadSingleFile(file: Express.Multer.File, dirName?: string): Promise<string>;
    deleteFile(fileName: string, dirName: string): Promise<void>;
    deleteFiles(fileNames: string[], dirName: string): Promise<void>;
    uploadFiles(files: Array<Express.Multer.File>, dirName?: string): Promise<Array<string>>;
    accessDir(dirPath: string): void;
}
