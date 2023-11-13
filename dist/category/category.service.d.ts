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
import { GetPublishServiceDto, MoveSubCategoryIDDto, VisiableDto } from './category.dto';
import { FilesService } from 'src/files/files.service';
import { PRIVACY } from 'src/enum/enum';
import { PublishService } from './publish-service.schema';
import { NotificationService } from 'src/notification/notification.service';
export declare class CategoryService {
    private readonly categoryModel;
    private readonly subCategoryModel;
    private readonly publishServiceModel;
    private filesService;
    private notificationService;
    constructor(categoryModel: Model<Category>, subCategoryModel: Model<SubCategory>, publishServiceModel: Model<PublishService>, filesService: FilesService, notificationService: NotificationService);
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
    getAllCategories(): Promise<{
        categoryId: string;
        name: string;
        numberView: number;
        isVisiable: boolean;
        fileName: string;
        _id: Types.ObjectId;
    }[]>;
    getSubCategories(categoryId: string): Promise<{
        subCategoryId: string;
        name: string;
        fileName: string;
        isVisiable: boolean;
        numberView: number;
        categoryId: Types.ObjectId;
        _id: Types.ObjectId;
    }[]>;
    deleteCategory(catId: string): Promise<string>;
    deleteSubCategory(subCatId: string): Promise<Types.ObjectId>;
    deletePublishCategory(pubCategiryId: string): Promise<Types.ObjectId>;
    moveSubcategory({ newCategoryId, subCategiryId }: MoveSubCategoryIDDto): Promise<void>;
    visiableCategory({ id, isVisiable, }: VisiableDto): Promise<VisiableDto>;
    visiableSubCategory({ id, isVisiable, }: VisiableDto): Promise<VisiableDto>;
    addPublishServices({ payload, files }: {
        payload: {
            userIdentityId: string;
            privacyPost: PRIVACY;
            title: string;
            text: string;
            userId: string;
            coordinates: {
                lat: number;
                lng: number;
            };
            servicesId: string;
            subServicesId: string;
        };
        files: Array<Express.Multer.File>;
    }): Promise<import("mongoose").Document<unknown, {}, PublishService> & PublishService & {
        _id: Types.ObjectId;
    }>;
    getPublishServices(body: GetPublishServiceDto): Promise<{
        publishServices: Omit<Omit<import("mongoose").Document<unknown, {}, PublishService> & PublishService & {
            _id: Types.ObjectId;
        }, never>, never>[];
        allPageNumber: number;
    }>;
}
