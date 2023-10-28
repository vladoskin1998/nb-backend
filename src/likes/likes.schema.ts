import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type LikesDocument = HydratedDocument<Likes>;

@Schema({ versionKey: false })
export class Likes {

    @Prop({ type: Array<String>, default: [] }) 
    usersId: Array<String>;
    
}

export const LikesSchema = SchemaFactory.createForClass(Likes);
