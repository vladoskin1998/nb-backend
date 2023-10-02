/// <reference types="multer" />
export declare class FilesService {
    uploadSingleFile(file: Express.Multer.File, dirName?: string, isOriginalFileName?: boolean): Promise<string>;
    deleteFile(fileName: string, dirName: string): Promise<string>;
    deleteFiles(fileNames: string[], dirName: string): Promise<void>;
    uploadFiles(files: Array<Express.Multer.File>, dirName?: string, isOriginalFileName?: boolean): Promise<Array<string>>;
    accessDir(dirPath: string): void;
}
