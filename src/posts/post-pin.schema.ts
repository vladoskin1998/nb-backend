import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/user/user.schema';
import { Repost } from './repost.schema';

export type PostPinDocument = HydratedDocument<PostPin>;

@Schema({ versionKey: false })
export class PostPin {
    
    @Prop({ type: Types.ObjectId, ref: User.name }) 
    userId: Types.ObjectId | null;

    @Prop({ type: Types.ObjectId, ref: Repost.name }) 
    repostId: Types.ObjectId;

    @Prop({ default: new Date()  })
    createdPinDate: Date;

}

export const PostPinSchema = SchemaFactory.createForClass(PostPin);
