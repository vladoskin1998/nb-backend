import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Category, SubCategory } from './category.schema'; // Импортируем схемы
import { CategoryDto, SubCategoryListDto } from './category.dto'; // Импортируем DTO
import { FilesService } from 'src/files/files.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    @InjectModel(SubCategory.name)
    private readonly subCategoryModel: Model<SubCategory>,
    private filesService: FilesService,
  ) {}

  async createCategory({
    category,
    subCategory,
    files,
  }: {
    category: CategoryDto;
    subCategory: SubCategoryListDto;
    files: Array<Express.Multer.File>;
  }): Promise<Category> {
    try {
      await this.filesService.uploadFiles(files, 'uploads/categories');

      const newCategory = new this.categoryModel({
        name: category.name,
        fileName: category.id,
      });

      if (subCategory && subCategory.listSubCategory.length > 0) {
        const subCategoriesArr = subCategory.listSubCategory.map((it) => ({
          name: it.name,
          fileName: it.id,
        }));

        const newSubCategory = new this.subCategoryModel(subCategoriesArr);
        newSubCategory.category = newCategory._id;

        await Promise.all([newCategory.save(), newSubCategory.save()]);
      } else {
        await newCategory.save();
      }
      return newCategory;
    } catch (error) {
      throw new Error('CategoryService createCategory' + error.message);
    }
  }

  async getAllCategories() {
    try {
      return await this.categoryModel.find().select('-fileName');
    } catch (error) {
      throw new Error('CategoryService getAllCategories' + error.message);
    }
  }

  async getSubCategories(categoryId: string) {
    try {
      await this.categoryModel.findOneAndUpdate(
        { _id: categoryId },
        { $inc: { numberView: 1 } },
      );
      return await this.subCategoryModel.find({
        category: new Types.ObjectId(categoryId),
      });
    } catch (error) {
      throw new Error('CategoryService getSubCategories' + error.message);
    }
  }

  async deleteCategory(categoryId) {
    try {
      await this.subCategoryModel.deleteMany({ category: categoryId });
      await this.categoryModel.findByIdAndDelete({ _id: categoryId });
      return categoryId;
    } catch (error) {}
  }

  async deleteSubCategory(id) {}
}
