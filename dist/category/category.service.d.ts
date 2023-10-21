/// <reference types="multer" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model, Types } from 'mongoose';
import { Category, SubCategory } from './category.schema';
import { CategoryDto, SubCategoryListDto, VisiableDto } from './category.dto';
import { FilesService } from 'src/files/files.service';
import { PRIVACY } from 'src/enum/enum';
import { PublishService } from './publish-service.schema';
export declare class CategoryService {
    private readonly categoryModel;
    private readonly subCategoryModel;
    private readonly publishServiceModel;
    private filesService;
    constructor(categoryModel: Model<Category>, subCategoryModel: Model<SubCategory>, publishServiceModel: Model<PublishService>, filesService: FilesService);
    createOrUpdateCategorie({ payload, file }: {
        payload: {
            name?: string;
            categorieId?: string;
        };
        file?: Express.Multer.File | null;
    }): Promise<import("mongoose").Document<unknown, {}, Category> & Category & {
        _id: Types.ObjectId;
    }>;
    createOrUpdateSubCategorie({ payload, file }: {
        payload: {
            name?: string;
            categorieId?: string;
            subCategorieId?: string;
        };
        file?: Express.Multer.File | null;
    }): Promise<import("mongoose").Document<unknown, {}, SubCategory> & SubCategory & {
        _id: Types.ObjectId;
    }>;
    createCategory({ category, subCategory, files, }: {
        category: CategoryDto;
        subCategory: SubCategoryListDto;
        files: Array<Express.Multer.File>;
    }): Promise<Category>;
    addSubCategoriesToCategories({ idCategory, subCategory, files, }: {
        idCategory: string;
        subCategory: SubCategoryListDto;
        files: Array<Express.Multer.File>;
    }): Promise<void>;
    createSubCategory({ idCategory, subCategory, }: {
        idCategory: Types.ObjectId;
        subCategory: SubCategoryListDto;
    }): Promise<void>;
    getAllCategories(): Promise<(import("mongoose").Document<unknown, {}, Category> & Category & {
        _id: Types.ObjectId;
    })[]>;
    getSubCategories(categoryId: string): Promise<(import("mongoose").Document<unknown, {}, SubCategory> & SubCategory & {
        _id: Types.ObjectId;
    })[]>;
    deleteCategory(catId: string): Promise<string>;
    deleteSubCategory(subCatId: string): Promise<Types.ObjectId>;
    visiableCategory({ id, isVisiable, }: VisiableDto): Promise<VisiableDto>;
    visiableSubCategory({ id, isVisiable, }: VisiableDto): Promise<VisiableDto>;
    addPublishServices({ payload, files }: {
        payload: {
            privacyPost: PRIVACY;
            title: string;
            text: string;
            userId: string;
            coordinates: {
                lat: number;
                lng: number;
            };
        };
        files: Array<Express.Multer.File>;
    }): Promise<import("mongoose").Document<unknown, {}, PublishService> & PublishService & {
        _id: Types.ObjectId;
    }>;
}
