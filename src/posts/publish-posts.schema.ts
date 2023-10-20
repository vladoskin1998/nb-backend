import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { PRIVACY } from 'src/enum/enum';
import { User } from 'src/user/user.schema';

export type PublishPostsDocument = HydratedDocument<PublishPosts>;

@Schema({ versionKey: false })
export class PublishPosts {

    @Prop({ type: Types.ObjectId, ref: User.name }) 
    userId: Types.ObjectId;

    @Prop()
    title: string;

    @Prop()
    text: string;

    @Prop({ type: Array<String>})
    filesName: string[];

    @Prop({ type: Object, default: { lat: null, lng: null } })
    coordinates: { lat: number | null; lng: number | null };

    @Prop({ default: PRIVACY.EVERYONE, enum:PRIVACY})
    privacyPost: PRIVACY;

}

export const PublishPostsSchema = SchemaFactory.createForClass(PublishPosts);
