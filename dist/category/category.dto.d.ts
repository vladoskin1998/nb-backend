export declare class IDDto {
    readonly id: string;
}
export declare class CategoryDto extends IDDto {
    readonly name: string;
}
export declare class SubCategoryListDto {
    readonly listSubCategory: CategoryDto[];
}
