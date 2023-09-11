import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Category, SubCategory } from './category.schema'; // Импортируем схемы
import { CategoryDto, SubCategoryListDto, VisiableDto } from './category.dto'; // Импортируем DTO
import { FilesService } from 'src/files/files.service';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
        @InjectModel(SubCategory.name)
        private readonly subCategoryModel: Model<SubCategory>,
        private filesService: FilesService,
    ) { }

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
                this.createSubCategory({
                    idCategory: newCategory._id,
                    subCategory,
                })
            }
            await newCategory.save();
            return newCategory;
        } catch (error) {
            throw new Error('CategoryService createCategory' + error.message);
        }
    }

    async addSubCategoriesToCategories(
        {
            idCategory,
            subCategory,
            files
        }: {
            idCategory: string,
            subCategory: SubCategoryListDto;
            files: Array<Express.Multer.File>;
        }
    ) {
        await this.filesService.uploadFiles(files, 'uploads/categories');
        const idCatRef = new Types.ObjectId(idCategory)
        await this.createSubCategory({
            idCategory: idCatRef,
            subCategory,
        })
        return
    }

    async createSubCategory(
        {
            idCategory,
            subCategory,
        }: {
            idCategory: Types.ObjectId;
            subCategory: SubCategoryListDto;
        }
    ) {
        const subCategoriesArr = subCategory.listSubCategory.map((it) => ({
            name: it.name,
            fileName: it.id,
            category: idCategory
        }));
        await this.subCategoryModel.create(subCategoriesArr);
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

    async deleteCategory(catId: string): Promise<string> {
        const categoryId = new Types.ObjectId(catId)
        try {
            const subFileNames = await this.subCategoryModel.find({ category: categoryId }, "fileName")
            const catFile = await this.categoryModel.findByIdAndDelete({ _id: catId })
            const deletedFiles = await subFileNames.map(item => item?.fileName)
            deletedFiles.push(catFile.fileName)
            await this.filesService.deleteFiles(deletedFiles, 'uploads/categories')
            await this.subCategoryModel.deleteMany({ category: categoryId });
            return catId;
        } catch (error) {
            throw error;
        }
    }

    async deleteSubCategory(subCatId: string) {
        const subCategoryId = new Types.ObjectId(subCatId)
        try {
            const subCatFile = await this.subCategoryModel.findByIdAndDelete({ _id: subCategoryId });
            await this.filesService.deleteFile(subCatFile.fileName, 'uploads/categories')
            return subCategoryId;
        } catch (error) {
            throw error
        }
    }

    async visiableCategory({ id, isVisiable }: VisiableDto): Promise<VisiableDto> {
        const categoryId = new Types.ObjectId(id)
        try {
            await this.categoryModel.findByIdAndUpdate({ _id: categoryId }, { isVisiable })
            return { id, isVisiable }
        } catch (error) {
            throw error;
        }
    }

    async visiableSubCategory({ id, isVisiable }: VisiableDto): Promise<VisiableDto> {
        const subCategoryId = new Types.ObjectId(id)
        try {
            await this.subCategoryModel.findByIdAndUpdate({ _id: subCategoryId }, { isVisiable })
            return { id, isVisiable }
        } catch (error) {
            throw error;
        }
    }


    async editCategory({ id, name }: CategoryDto): Promise<CategoryDto> {
        const categoryId = new Types.ObjectId(id)
        try {
            await this.categoryModel.findByIdAndUpdate({ _id: categoryId }, { name })
            return { id, name }
        } catch (error) {
            throw error;
        }
    }

    async editSubCategory({ id, name }: CategoryDto): Promise<CategoryDto> {
        const subCategoryId = new Types.ObjectId(id)
        try {
            await this.subCategoryModel.findByIdAndUpdate({ _id: subCategoryId }, { name })
            return { id, name }
        } catch (error) {
            throw error;
        }
    }
}
