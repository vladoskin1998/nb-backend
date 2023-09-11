export declare class IDDto {
    readonly id: string;
}
export declare class VisiableDto extends IDDto {
    readonly isVisiable: boolean;
}
export declare class CategoryDto extends IDDto {
    readonly name: string;
}
export declare class SubCategoryListDto {
    readonly listSubCategory: CategoryDto[];
}
