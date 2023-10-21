import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import {
    Category,
    CategorySchema,
    SubCategory,
    SubCategorySchema,
} from './category.schema';
import { FilesModule } from '../files/files.module';
import { MulterModule } from '@nestjs/platform-express';
import { PublishService, PublishServiceSchema } from './publish-service.schema';
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Category.name, schema: CategorySchema },
            { name: SubCategory.name, schema: SubCategorySchema },
            { name: PublishService.name, schema: PublishServiceSchema },
        ]),
        MulterModule.register({}),
        FilesModule,
    ],
    controllers: [CategoryController],
    providers: [CategoryService],
})
export class CategoryModule {}
