import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/user/user.schema';


export type PostHideDocument = HydratedDocument<PostHide>;

@Schema({ versionKey: false })
export class PostHide {

    @Prop({ type: Types.ObjectId, ref: User.name }) 
    ownerId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: User.name }) 
    hideUserId?: Types.ObjectId | null;

    @Prop({ type: Types.ObjectId, ref: User.name }) 
    hideRepostId?: Types.ObjectId | null;

    @Prop({ default: new Date()  })
    createdHideDate: Date;

}

export const PostHideSchema = SchemaFactory.createForClass(PostHide);
