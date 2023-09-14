import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ActivitiesDocument = HydratedDocument<Activities>;

@Schema({ versionKey: false })
export class Activities {
    @Prop()
    name: string;

    @Prop({ default: 0 })
    numberView:number;

    @Prop({default: true})
    isVisiable: boolean;

    @Prop()
    fileName: string;
}

export const ActivitiesSchema = SchemaFactory.createForClass(Activities);
