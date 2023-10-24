import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { PRIVACY } from 'src/enum/enum';
import { User } from 'src/user/user.schema';
import { Activities } from './activities.schema';
import { UserIdentity } from 'src/user-identity/user-identity.schema';

export type PublishActivitiesDocument = HydratedDocument<PublishActivities>;

@Schema({ versionKey: false })
export class PublishActivities {

    @Prop({ type: Types.ObjectId, ref: User.name }) 
    userId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: UserIdentity.name }) 
    userIdentityId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: Activities.name }) 
    activitiesId: Types.ObjectId;

    @Prop()
    title: string;

    @Prop()
    text: string;

    @Prop({ type: Array<String>})
    filesName: string[];

    @Prop({ type: Object, default: { lat: null, lng: null } })
    coordinates: { lat: number | null; lng: number | null };

    @Prop({ default: PRIVACY.EVERYONE, enum:PRIVACY})
    privacyEvent: PRIVACY;

    @Prop({default: null})
    startDate: Date | null

    @Prop({default: new Date()})
    createEventDate: Date | null

}

export const PublishActivitiesSchema = SchemaFactory.createForClass(PublishActivities);
