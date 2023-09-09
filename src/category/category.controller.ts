import { Controller, Post, Body, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto, SubCategoryListDto } from './category.dto'; // Создайте DTO по вашим требованиям
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { MulterModule } from '@nestjs/platform-express';
@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Post('add-categories')
    @UseInterceptors(FilesInterceptor('files'))
    async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>, @Body() body) {

        console.log(files);

        const { category, subCategory }: {
            category: {id:string, name:string},
            subCategory:  {id:string, name:string}[]
        } = JSON.parse(body.payload)

        await this.categoryService.createCategory(
            { category, subCategory, files }
        );
    }
}
