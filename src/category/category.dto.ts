
import { IsString, IsArray, ValidateNested } from 'class-validator';

export class CategoryDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly id: string;
}

export class SubCategoryListDto {
    @IsArray()
    @ValidateNested({ each: true })
    readonly listSubCategory: CategoryDto[];
}
