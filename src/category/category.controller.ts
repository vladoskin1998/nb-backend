import {
    Controller,
    Post,
    Body,
    UploadedFiles,
    UseInterceptors,
    Get,
    Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import {
    CategoryDto,
    EditDto,
    IDDto,
    SubCategoryListDto,
    VisiableDto,
} from './category.dto'; // Создайте DTO по вашим требованиям
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post('add-categories')
    @UseInterceptors(FilesInterceptor('files'))
    async addCategories(
        @UploadedFiles() files: Array<Express.Multer.File>,
        @Body() body,
    ) {
        const {
            category,
            subCategory,
        }: {
            category: CategoryDto;
            subCategory: SubCategoryListDto;
        } = JSON.parse(body.payload);

        return await this.categoryService.createCategory({
            category,
            subCategory,
            files,
        });
        
    }

    @Post('add-sub-categories')
    @UseInterceptors(FilesInterceptor('files'))
    async addSubCategoriesToCategories(
        @UploadedFiles() files: Array<Express.Multer.File>,
        @Body() body,
    ) {
        const {
            category,
            subCategory,
        }: {
            category: IDDto;
            subCategory: SubCategoryListDto;
        } = JSON.parse(body.payload);

        await this.categoryService.addSubCategoriesToCategories({
            idCategory: category.id,
            subCategory,
            files,
        });
        return;
    }

    @Get('all-categories')
    async allCategories() {
        return await this.categoryService.getAllCategories();
    }

    @Get('sub-categories')
    async allSubCategorie(@Query() { id }: IDDto) {
        console.log(id);
        return await this.categoryService.getSubCategories(id);
    }

    @Post('delete-category')
    async deleteCategory(@Body() { id }: IDDto) {
        return await this.categoryService.deleteCategory(id);
    }

    @Post('delete-subcategory')
    async deleteSubCategory(@Body() { id }: IDDto) {
        return await this.categoryService.deleteSubCategory(id);
    }

    @Post('visiable-category')
    async visiableCategory(@Body() dto: VisiableDto) {
        return await this.categoryService.visiableCategory(dto);
    }

    @Post('visiable-subcategory')
    async visiableSubCategory(@Body() dto: VisiableDto) {
        return await this.categoryService.visiableSubCategory(dto);
    }

    @Post('edit-category')
    async editCategory(@Body() dto: EditDto) {
        return await this.categoryService.editCategory(dto);
    }

    @Post('edit-subcategory')
    async editSubCategory(@Body() dto: EditDto) {
        return await this.categoryService.editSubCategory(dto);
    }
}

//b56fd990-50d0-11ee-9654-439fda3e3d97
//b56fd990-50d0-11ee-9654-439fda3e3d97
