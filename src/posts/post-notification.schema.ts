import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { PublishPosts } from './publish-posts.schema';
import { NOTIFICATION_POST } from 'src/enum/enum';

export type PostNotificationDocument = HydratedDocument<PostNotification>;

@Schema({ versionKey: false })
export class PostNotification {

    @Prop({ type: String }) 
    userId: string;

    @Prop({ type: Types.ObjectId, ref: PublishPosts.name }) 
    postId: Types.ObjectId;

    @Prop({ default: NOTIFICATION_POST.POST , enum: NOTIFICATION_POST})
    typeNotification: NOTIFICATION_POST ;

    @Prop({ default: new Date()  })
    createdRepostDate: Date;

}

export const PostNotificationSchema = SchemaFactory.createForClass(PostNotification);
