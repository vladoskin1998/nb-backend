import { IsString, IsArray, ValidateNested, IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class IDDto {
    @IsNotEmpty()
    @IsString()
    readonly id: string;
}

export class VisiableDto extends IDDto {
    @IsBoolean()
    readonly isVisiable: boolean;
}

export class CategoryDto {

    @IsNotEmpty()
    @IsString()
    readonly fileName: string;

    @IsString()
    @IsNotEmpty()
    readonly name: string;
}

export class EditDto extends IDDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;
}

export class SubCategoryListDto {
    @IsArray()
    @ValidateNested({ each: true })
    readonly listSubCategory: CategoryDto[];
}

