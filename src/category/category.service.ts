import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Category, SubCategory } from './category.schema'; // Импортируем схемы
import {
    CategoryDto,
    EditDto,
    GetOnePublishDto,
    GetPublishServiceDto,
    MoveSubCategoryIDDto,
    SubCategoryListDto,
    VisiableDto,
} from './category.dto'; // Импортируем DTO
import { FilesService } from 'src/files/files.service';
import { NOTIFICATION_EVENT, PRIVACY } from 'src/enum/enum';
import { PublishService } from './publish-service.schema';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class CategoryService {

    constructor(
        @InjectModel(Category.name)
        private readonly categoryModel: Model<Category>,
        @InjectModel(SubCategory.name)
        private readonly subCategoryModel: Model<SubCategory>,
        @InjectModel(PublishService.name)
        private readonly publishServiceModel: Model<PublishService>,
        private filesService: FilesService,
        private notificationService: NotificationService
    ) { }

    async createOrUpdateCategorie({ payload, file }: { payload: { name?: string, categorieId?: string }, file?: Express.Multer.File | null }) {

        try {
            if (payload?.categorieId) {
                const categorieId = new Types.ObjectId(payload.categorieId)

                const categorie = await this.categoryModel.findOne({ _id: categorieId })

                if (file) {
                    await this.filesService.deleteFile(categorie.fileName, 'uploads/categories',)
                    const fileName = await this.filesService.uploadSingleFile(file, 'uploads/categories', false)
                    await categorie.updateOne({ fileName })
                }

                if (payload?.name) {
                    await categorie.updateOne({ name: payload?.name })
                }

                return categorie
            }

            const fileName = await this.filesService.uploadSingleFile(file, 'uploads/categories', false)

            return await this.categoryModel.create({ fileName, name: payload.name })

        } catch (e) {

        }
    }


    async createOrUpdateSubCategorie({ payload, file }: { payload: { name?: string, categorieId?: string, subCategorieId?: string }, file?: Express.Multer.File | null }) {

        try {
            if (payload?.subCategorieId) {
                const subCategorieId = new Types.ObjectId(payload.subCategorieId)

                const subCategorie = await this.subCategoryModel.findOne({ _id: subCategorieId })

                if (file) {
                    await this.filesService.deleteFile(subCategorie.fileName, 'uploads/categories',)
                    const fileName = await this.filesService.uploadSingleFile(file, 'uploads/categories', false)
                    await subCategorie.updateOne({ fileName })
                }

                if (payload?.name) {
                    await subCategorie.updateOne({ name: payload?.name })
                }

                return subCategorie
            }

            const fileName = await this.filesService.uploadSingleFile(file, 'uploads/categories', false)

            const categoryId = new Types.ObjectId(payload?.categorieId)

            return await this.subCategoryModel.create({ fileName, name: payload.name, categoryId })

        } catch (e) {

        }
    }

    async getAllCategories() {
        try {
            let allCategories = await this.categoryModel.find()
            return allCategories.map(category => ({
                ...category.toObject(),
                categoryId: category._id.toString(),
            })
            );

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

            let allSubCategories = await this.subCategoryModel.find({
                categoryId: new Types.ObjectId(categoryId),
            });
            return allSubCategories.map(subCategory => ({
                ...subCategory.toObject(),
                subCategoryId: subCategory._id.toString(),
            })
            );
        } catch (error) {
            throw new Error('CategoryService getSubCategories' + error.message);
        }
    }

    async deleteCategory(catId: string): Promise<string> {
        const categoryId = new Types.ObjectId(catId);
        try {

            const subFileNames = await this.subCategoryModel.find({ categoryId }).select('fileName')
            const publishFileNames = await this.publishServiceModel.find({ servicesId: categoryId }).select('filesName')


            const deletedPublishFiles = publishFileNames.map((item) => item?.filesName).flat(1);

            await this.filesService.deleteFiles(
                deletedPublishFiles,
                'uploads/publish_services',
            );

            const catFile = await this.categoryModel.findByIdAndDelete({ _id: catId });

            const deletedFiles = subFileNames.map((item) => item?.fileName);

            deletedFiles.push(catFile.fileName);

            await this.filesService.deleteFiles(
                deletedFiles,
                'uploads/categories',
            );

            await this.subCategoryModel.deleteMany({ categoryId });
            await this.publishServiceModel.deleteMany({ servicesId: categoryId });
            return catId;
        } catch (error) {
            throw error;
        }
    }

    async deleteSubCategory(subCatId: string) {
        const subCategoryId = new Types.ObjectId(subCatId);
        try {
            const subCatFile = await this.subCategoryModel.findByIdAndDelete({
                _id: subCategoryId,
            });

            const publishFileNames = await this.publishServiceModel.find({ subServicesId: subCatId }).select('filesName')
            const deletedPublishFiles = publishFileNames.map((item) => item?.filesName).flat(1);

            await this.filesService.deleteFiles(deletedPublishFiles, 'uploads/publish_services');

            await this.filesService.deleteFile(subCatFile.fileName, 'uploads/categories');

            await this.publishServiceModel.deleteMany({ subServicesId: subCatId });
            return subCategoryId;
        } catch (error) {
            throw error;
        }
    }

    async deletePublishCategory(pubCategiryId: string) {
        const publishCategiryId = new Types.ObjectId(pubCategiryId);
        try {
            const publishFileNames = await this.publishServiceModel.findByIdAndDelete({
                _id: publishCategiryId,
            });

            await this.filesService.deleteFiles(
                publishFileNames.filesName,
                'uploads/publish_services',
            );
            return publishCategiryId;
        } catch (error) {
            throw error;
        }
    }

    async moveSubcategory({ newCategoryId, subCategiryId }: MoveSubCategoryIDDto) {
        try {
            const categoryId = new Types.ObjectId(newCategoryId)
            const _id = new Types.ObjectId(subCategiryId)
            await this.subCategoryModel.findByIdAndUpdate({ _id }, { categoryId })

        } catch (error) {
            throw error;
        }
    }

    async visiableCategory({
        id,
        isVisiable,
    }: VisiableDto): Promise<VisiableDto> {
        const categoryId = new Types.ObjectId(id);
        try {
            await this.categoryModel.findByIdAndUpdate(
                { _id: categoryId },
                { isVisiable },
            );
            return { id, isVisiable };
        } catch (error) {
            throw error;
        }
    }

    async visiableSubCategory({
        id,
        isVisiable,
    }: VisiableDto): Promise<VisiableDto> {
        const subCategoryId = new Types.ObjectId(id);
        try {
            await this.subCategoryModel.findByIdAndUpdate(
                { _id: subCategoryId },
                { isVisiable },
            );
            return { id, isVisiable };
        } catch (error) {
            throw error;
        }
    }


    async addPublishServices(
        { payload, files }: {
            payload: {
                userIdentityId: string,
                privacyPost: PRIVACY,
                title: string,
                text: string,
                userId: string,
                coordinates: { lat: number; lng: number }
                servicesId: string,
                subServicesId: string,
            }, files: Array<Express.Multer.File>
        }
    ) {
        try {
            const userId = new Types.ObjectId(payload.userId)
            const userIdentityId = new Types.ObjectId(payload.userIdentityId)

            const servicesId = new Types.ObjectId(payload.servicesId)
            const subServicesId = new Types.ObjectId(payload.subServicesId)
            const filesName = await this.filesService.uploadFiles(files, 'uploads/publish_services', false)

            await this.notificationService.sendNotificationBroadcast({
                ownerId: payload.userId,
                ownerIdentityId: payload.userIdentityId,
                title: payload.text,
                name: payload.title,
                fileName: filesName[0],
                event: NOTIFICATION_EVENT.NOTIFICATION_SERVICE
            })

            return await this.publishServiceModel.create({
                ...payload, filesName, userId, userIdentityId, servicesId, subServicesId
            })
        } catch (error) {

        }
    }

    async getPublishServices(body: GetPublishServiceDto) {
        const pageSize = 100
        const allPageNumber = Math.ceil((await this.publishServiceModel.countDocuments()) / pageSize)
        const subServicesId = new Types.ObjectId(body.subServicesId)

        const skip = (body.pageNumber - 1) * pageSize;

        const publishServices = await this.publishServiceModel
            .find({ subServicesId })
            .skip(skip)
            .limit(pageSize)
            .sort({ createdPublishServiceDate: -1 })
            .populate({
                path: 'userId',
                select: 'fullName avatarFileName',
            })
            .populate({
                path: 'userIdentityId',
            })   
            .populate({
                path: 'servicesId',
                select: 'name',
            })
            .populate({
                path: 'subServicesId',
                select: 'name',
            })
            .exec();

        return { publishServices, allPageNumber };
    }

    async getTenPublishServices(){
        try {
            const publishServices = await this.publishServiceModel
            .find()
            .sort({ createdPublishServiceDate: -1 })
            .populate({
                path: 'userId',
                select: 'fullName avatarFileName email role',
            })
            .populate({
                path: 'userIdentityId',
                populate: {
                    path: 'profession dateBirth',
                },
            })
            .populate({
                path: 'servicesId',
                select: 'name',
            })
            .populate({
                path: 'subServicesId',
                select: 'name',
            })

            return publishServices
        } catch (error) {
            throw new Error(error)
        }
    }

    async getOnePublishService(body: GetOnePublishDto){
        try {
            const publishId = new Types.ObjectId(body.publishServiceId)

            const publishServices = await this.publishServiceModel
            .findOne({_id:publishId})
            .populate({
                path: 'userId',
                select: 'fullName avatarFileName email role',
            })
            .populate({
                path: 'userIdentityId',
                populate: {
                    path: 'profession',
                },
            })
            .populate({
                path: 'servicesId',
                select: 'name fileName',
            })
            .populate({
                path: 'subServicesId',
                select: 'name',
            })

            return publishServices
        } catch (error) {
            throw new Error(error)
        }
    }

}
