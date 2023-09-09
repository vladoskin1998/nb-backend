/// <reference types="multer" />
import { CategoryService } from './category.service';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    uploadFile(files: Array<Express.Multer.File>, body: any): Promise<void>;
}
