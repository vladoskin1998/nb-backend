import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { NOTIFICATION_EVENT, NOTIFICATION_MAILING } from 'src/enum/enum';
import { UserIdentity } from 'src/user-identity/user-identity.schema';
import { User } from 'src/user/user.schema';

export type AuthenticationDocument = HydratedDocument<Notification>;

@Schema()
export class Notification {

    @Prop({ type: Types.ObjectId, ref: User.name })
    ownerId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: UserIdentity.name })
    ownerIdentityId: Types.ObjectId;
    
    @Prop({ type: Types.ObjectId, ref: User.name })
    userId: Types.ObjectId;

    @Prop({ type: String, })
    title: string;

    @Prop({ type: String, })
    fileName: string;

    @Prop({ type: String, })
    name: string;

    @Prop({ enum: NOTIFICATION_EVENT })
    event: NOTIFICATION_EVENT;

    @Prop({ enum: NOTIFICATION_MAILING, default: NOTIFICATION_MAILING.NOTIFICATION_ROOMS })
    mailing: NOTIFICATION_MAILING;

    @Prop({ type: Date, default: new Date() })
    dateNotificationCreated: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);