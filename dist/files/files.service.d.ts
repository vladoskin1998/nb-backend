/// <reference types="multer" />
export declare class FilesService {
    uploadFiles(files: Array<Express.Multer.File>, dirName?: string): Promise<Array<string>>;
    deleteFiles(files: string[], dirName: string): Promise<void>;
    accessDir(dirPath: string): Promise<void>;
}
