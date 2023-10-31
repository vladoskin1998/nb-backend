import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { PublishPosts } from './publish-posts.schema';
import { UserIdentity } from 'src/user-identity/user-identity.schema';
import { User } from 'src/user/user.schema';
import { Likes } from 'src/likes/likes.schema';

export type PublishCommentsDocument = HydratedDocument<PublishComments>;

@Schema({ versionKey: false })
export class PublishComments {

    @Prop({ type: Types.ObjectId, ref: User.name }) 
    userId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: UserIdentity.name }) 
    userIdentityId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: PublishPosts.name }) 
    postId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: Likes.name }) 
    likes: Types.ObjectId;

    @Prop()
    text: string;

    @Prop({type: Date, default:new Date()})
    createdDateComment: Date;
    
}

export const PublishCommentsSchema = SchemaFactory.createForClass(PublishComments);
