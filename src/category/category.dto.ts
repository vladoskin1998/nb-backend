
import { IsString, IsArray, ValidateNested, IsBoolean } from 'class-validator';

export class IDDto {
    @IsString()
    readonly id: string;
}


export class VisiableDto extends IDDto {
    @IsBoolean()
    readonly isVisiable: boolean;
}

export class CategoryDto {
    @IsString()
    readonly fileName: string;

    @IsString()
    readonly name: string;
}

export class EditDto extends IDDto{
    
    @IsString()
    readonly name: string;
}

export class SubCategoryListDto {
    @IsArray()
    @ValidateNested({ each: true })
    readonly listSubCategory: CategoryDto[];
}
