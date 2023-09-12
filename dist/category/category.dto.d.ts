export declare class IDDto {
    readonly id: string;
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
