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
    CategoryIDDto,
    GetOnePublishDto,
    GetPublishServiceDto,
    IDDto,
    MoveSubCategoryIDDto,
    PublishCategoryIDDto,
    SubCategoryIDDto,
    VisiableDto,
} from './category.dto'; 
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Post('add-categorie')
    @UseInterceptors(FileInterceptor('file'))
    async addCategorie(
        @UploadedFile() file: Express.Multer.File | null,
        @Body() body,
    ) {
        const payload = JSON.parse(body.payload);

        return await this.categoryService.createOrUpdateCategorie({ file, payload })
    }

    @Post('add-sub-categorie')
    @UseInterceptors(FileInterceptor('file'))
    async addSubCategorie(
        @UploadedFile() file: Express.Multer.File | null,
        @Body() body,
    ) {
        const payload = JSON.parse(body.payload);
        return await this.categoryService.createOrUpdateSubCategorie({ file, payload })
    }

    @Get('all-categories')
    async allCategories() {
        return await this.categoryService.getAllCategories()
    }

    @Get('sub-categories')
    async allSubCategorie(@Query() { id }: IDDto) {
        return await this.categoryService.getSubCategories(id);
    }

    @Post('move-subcategory')
    async moveSubCategory(@Body() dto: MoveSubCategoryIDDto) {
        return await this.categoryService.moveSubcategory(dto);
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
    async deleteCategory(@Body() { categiryId }: CategoryIDDto) {
        return await this.categoryService.deleteCategory(categiryId);
    }

    @Post('delete-subcategory')
    async deleteSubCategory(@Body() { subCategiryId }: SubCategoryIDDto) {
        return await this.categoryService.deleteSubCategory(subCategiryId);
    }

    @Post('delete-publish-category')
    async deletePublishCategory(@Body() { publishCategiryId }: PublishCategoryIDDto) {
        return await this.categoryService.deleteSubCategory(publishCategiryId);
    }

    @Post('add-publish-service')
    @UseInterceptors(FilesInterceptor('files'))
    async addPost(
        @Body() body,
        @UploadedFiles() files: Array<Express.Multer.File> | null,
    ) {
        const payload = JSON.parse(body.payload);
        return await this.categoryService.addPublishServices({ files, payload })
    }

    @Post('get-publish-service')
    async getPosts(@Body() body: GetPublishServiceDto) {
        return await this.categoryService.getPublishServices(body)
    }

    @Post('get-ten-publish-service')
    async getTenPosts() {
        return await this.categoryService.getTenPublishServices()
    }

    
    @Post('get-one-publish-service')
    async getOnePublishService(@Body() body: GetOnePublishDto) {
        return await this.categoryService.getOnePublishService(body)
    }

    
}

