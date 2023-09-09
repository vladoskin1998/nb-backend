import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;
export type SubCategoryDocument = HydratedDocument<SubCategory>;

@Schema()
export class SubCategory {
    @Prop()
    name: string;

    @Prop()
    fileName: string;

    @Prop({ type: Types.ObjectId, ref: 'Category' }) 
    category: Types.ObjectId; 
}

@Schema()
export class Category {
    @Prop()
    name: string;

    @Prop()
    fileName: string;
}

export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);
export const CategorySchema = SchemaFactory.createForClass(Category);
