import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/user/user.schema';
import { PublishPosts } from './publish-posts.schema';

export type RepostDocument = HydratedDocument<Repost>;

@Schema({ versionKey: false })
export class Repost {

    @Prop({ type: Types.ObjectId, ref: User.name }) 
    ownerId: Types.ObjectId | null;

    @Prop({ type: Types.ObjectId, ref: User.name }) 
    repostedUserId: Types.ObjectId | null;

    @Prop({ type: Types.ObjectId, ref: PublishPosts.name }) 
    postId: Types.ObjectId;

    @Prop({ default: new Date()  })
    createdRepostDate: Date;

}

export const RepostSchema = SchemaFactory.createForClass(Repost);
