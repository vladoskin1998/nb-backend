/// <reference types="multer" />
import { Model } from 'mongoose';
import { Category, SubCategory } from './category.schema';
import { CategoryDto } from './category.dto';
import { FilesService } from 'src/files/files.service';
export declare class CategoryService {
    private readonly categoryModel;
    private readonly subCategoryModel;
    private filesService;
    constructor(categoryModel: Model<Category>, subCategoryModel: Model<SubCategory>, filesService: FilesService);
    createCategory({ category, subCategory, files, }: {
        category: CategoryDto;
        subCategory: {
            id: string;
            name: string;
        }[];
        files: Array<Express.Multer.File>;
    }): Promise<Category>;
}
