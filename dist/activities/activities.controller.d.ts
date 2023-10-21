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
import { ActivitiesService } from './activities.service';
import { ActivitiesDto } from './activities.dto';
import { IDDto, VisiableDto } from 'src/category/category.dto';
export declare class ActivitiesController {
    private readonly activitiesService;
    constructor(activitiesService: ActivitiesService);
    addActivitie(files: Array<Express.Multer.File>, body: any): Promise<ActivitiesDto>;
    allActivities(): Promise<(import("mongoose").Document<unknown, {}, import("./activities.schema").Activities> & import("./activities.schema").Activities & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    deleteCategory({ id }: IDDto): Promise<import("mongoose").Types.ObjectId>;
    visiableCategory(dto: VisiableDto): Promise<VisiableDto>;
    getPost(): Promise<void>;
    addPost(body: any, files: Array<Express.Multer.File> | null): Promise<import("mongoose").Document<unknown, {}, import("./publish-activities.schema").PublishActivities> & import("./publish-activities.schema").PublishActivities & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
