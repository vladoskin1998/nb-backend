
import { IsString, IsArray, ValidateNested, IsBoolean } from 'class-validator';

export class IDDto{
    @IsString()
    readonly id: string;
}


export class VisiableDto extends IDDto{
    @IsBoolean()
    readonly isVisiable: boolean;
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
