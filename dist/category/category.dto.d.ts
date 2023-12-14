export declare class IDDto {
    readonly id: string;
}
export declare class CategoryIDDto {
    readonly categiryId: string;
}
export declare class SubCategoryIDDto {
    readonly subCategiryId: string;
}
export declare class PublishCategoryIDDto {
    readonly publishCategiryId: string;
}
export declare class MoveSubCategoryIDDto {
    readonly newCategoryId: string;
    readonly subCategiryId: string;
}
export declare class VisiableDto extends IDDto {
    readonly isVisiable: boolean;
}
export declare class CategoryDto {
    readonly fileName: string;
    readonly name: string;
}
export declare class EditDto extends IDDto {
    readonly name: string;
}
export declare class SubCategoryListDto {
    readonly listSubCategory: CategoryDto[];
}
export declare class GetPublishServiceDto {
    pageNumber: number;
    subServicesId: number;
}
export declare class GetOnePublishDto {
    readonly publishServiceId: string;
}
