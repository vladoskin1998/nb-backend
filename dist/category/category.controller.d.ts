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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { CategoryService } from './category.service';
import { IDDto, VisiableDto } from './category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    addCategorie(file: Express.Multer.File | null, body: any): Promise<import("mongoose").Document<unknown, {}, import("./category.schema").Category> & import("./category.schema").Category & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    addSubCategorie(file: Express.Multer.File | null, body: any): Promise<import("mongoose").Document<unknown, {}, import("./category.schema").SubCategory> & import("./category.schema").SubCategory & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    allCategories(): Promise<(import("mongoose").Document<unknown, {}, import("./category.schema").Category> & import("./category.schema").Category & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    allSubCategorie({ id }: IDDto): Promise<(import("mongoose").Document<unknown, {}, import("./category.schema").SubCategory> & import("./category.schema").SubCategory & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    visiableCategory(dto: VisiableDto): Promise<VisiableDto>;
    visiableSubCategory(dto: VisiableDto): Promise<VisiableDto>;
    deleteCategory({ id }: IDDto): Promise<string>;
    deleteSubCategory({ id }: IDDto): Promise<import("mongoose").Types.ObjectId>;
}
