import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';

export type CategoryDocument = Model<Category>;
export type SubCategoryDocument = Model<SubCategory>;

@Schema({ versionKey: false })
export class SubCategory {
    @Prop()
    name: string;

    @Prop()
    fileName: string;

    @Prop({default: true})
    isVisiable: boolean;
    
    @Prop({ default: 0 })
    numberView:number;

    @Prop({ type: Types.ObjectId, ref: 'Category' }) 
    category: Types.ObjectId; 
}

@Schema({ versionKey: false })
export class Category {
    @Prop()
    name: string;

    @Prop({ default: 0 })
    numberView:number;

    @Prop({default: true})
    isVisiable: boolean;

    @Prop()
    fileName: string;
}

export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);
export const CategorySchema = SchemaFactory.createForClass(Category);
