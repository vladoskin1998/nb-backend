import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema()
export class UserInterests {

    @Prop({type: String})
    title: string;

}

export type UserInterestsDocument = HydratedDocument<UserInterests>;
export const UserInterestsSchema = SchemaFactory.createForClass(UserInterests);