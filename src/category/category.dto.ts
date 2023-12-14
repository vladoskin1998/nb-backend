import { IsString, IsArray, ValidateNested, IsBoolean, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class IDDto {
    @IsNotEmpty()
    @IsString()
    readonly id: string;
}

export class CategoryIDDto {
    @IsNotEmpty()
    @IsString()
    readonly categiryId: string;
}

export class SubCategoryIDDto {
    @IsNotEmpty()
    @IsString()
    readonly subCategiryId: string;
}

export class PublishCategoryIDDto {
    @IsNotEmpty()
    @IsString()
    readonly publishCategiryId: string;
}

export class MoveSubCategoryIDDto {
    @IsNotEmpty()
    @IsString()
    readonly newCategoryId: string;

    @IsNotEmpty()
    @IsString()
    readonly subCategiryId: string;
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



export class GetPublishServiceDto{

    @IsNumber()
    pageNumber: number

    @IsString()
    subServicesId: number

}


export class GetOnePublishDto {
    @IsNotEmpty()
    @IsString()
    readonly publishServiceId: string;
}



