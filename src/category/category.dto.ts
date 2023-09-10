
import { IsString, IsArray, ValidateNested } from 'class-validator';

export class IDDto{
    @IsString()
    readonly id: string;
}

export class CategoryDto extends IDDto {
    @IsString()
    readonly name: string;
}

export class SubCategoryListDto {
    @IsArray()
    @ValidateNested({ each: true })
    readonly listSubCategory: CategoryDto[];
}
