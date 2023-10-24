import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;
export type SubCategoryDocument = HydratedDocument<SubCategory>;

@Schema({ versionKey: false })
export class SubCategory {
    @Prop()
    name: string;

    @Prop()
    fileName: string;

    @Prop({ default: true })
    isVisiable: boolean;

    @Prop({ default: 0 })
    numberView: number;

    @Prop({ type: Types.ObjectId, ref: 'Category' })
    categoryId: Types.ObjectId;
}

@Schema({ versionKey: false })
export class Category {
    @Prop()
    name: string;

    @Prop({ default: 0 })
    numberView: number;

    @Prop({ default: true })
    isVisiable: boolean;

    @Prop()
    fileName: string;
}

export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);
export const CategorySchema = SchemaFactory.createForClass(Category);
