/// <reference types="multer" />
import { FilesService } from './files.service';
import { HTTP_MESSAGE } from 'src/enum/enum';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    uploadFiles(files: Array<Express.Multer.File>): Promise<string[]>;
    deletesFile({ files }: {
        files: string[];
    }): Promise<HTTP_MESSAGE>;
}
