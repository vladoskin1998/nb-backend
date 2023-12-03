import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/user/user.schema';
import { PublishPosts } from './publish-posts.schema';

export type RepostDocument = HydratedDocument<MarkPost>;

@Schema({ versionKey: false })
export class MarkPost {

    @Prop({ type: Types.ObjectId, ref: User.name }) 
    marckedUserId: Types.ObjectId | null;

    @Prop({ type: Types.ObjectId, ref: PublishPosts.name }) 
    postId: Types.ObjectId;

    @Prop({ default: new Date()  })
    createdPostDate: Date;

}

export const MarkPostSchema = SchemaFactory.createForClass(MarkPost);
