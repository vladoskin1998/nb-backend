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
import { CategoryDto, IDDto, SubCategoryListDto } from './category.dto'; // Создайте DTO по вашим требованиям
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('add-categories')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFile(
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

    await this.categoryService.createCategory({ category, subCategory, files });
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
  async deleteCategory(@Body() {id}: IDDto) {
    return await this.categoryService.deleteCategory(id)
  }

  @Post('delete-subcategory')
  async deleteSubCategory(@Body() {id}: IDDto) {
    return await this.categoryService.deleteSubCategory(id)
  }
}
