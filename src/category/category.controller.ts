import {
    Controller,
    Post,
    Body,
    UploadedFiles,
    UseInterceptors,
    Get,
    Query,
    UploadedFile,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import {
    CategoryDto,
    EditDto,
    IDDto,
    SubCategoryListDto,
    VisiableDto,
} from './category.dto'; // Создайте DTO по вашим требованиям
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post('add-categorie')
    @UseInterceptors(FileInterceptor('file'))
    async addCategorie(
        @UploadedFile() file: Express.Multer.File | null,
        @Body() body,
    ){
       const payload = JSON.parse(body.payload);
      
        return await this.categoryService.createOrUpdateCategorie({file ,payload})
    }
    
    @Post('add-sub-categorie')
    @UseInterceptors(FileInterceptor('file'))
    async addSubCategorie(
        @UploadedFile() file: Express.Multer.File | null,
        @Body() body,
    ){
      const payload = JSON.parse(body.payload);
         return await this.categoryService.createOrUpdateSubCategorie({file ,payload})
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
    
    @Post('visiable-category')
    async visiableCategory(@Body() dto: VisiableDto) {
        return await this.categoryService.visiableCategory(dto);
    }

    @Post('visiable-subcategory')
    async visiableSubCategory(@Body() dto: VisiableDto) {
        return await this.categoryService.visiableSubCategory(dto);
    }

    @Post('delete-category')
    async deleteCategory(@Body() { id }: IDDto) {
        return await this.categoryService.deleteCategory(id);
    }

    @Post('delete-subcategory')
    async deleteSubCategory(@Body() { id }: IDDto) {
        return await this.categoryService.deleteSubCategory(id);
    }

}

