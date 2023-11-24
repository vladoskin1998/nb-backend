import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { METHOD_REGISTRATION, ROLES, PRIVACY, SEX, ORIENTATION, EDUCATION, FAMILYSTATUS } from 'src/enum/enum';
import { HydratedDocument, Types } from 'mongoose';
import { User } from './user.schema';

export type FriendsDocument = HydratedDocument<Friends>;

@Schema()
export class Friends {

    @Prop({ type: Types.ObjectId, ref: User.name }) 
    userId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: User.name }) 
    friendId: Types.ObjectId;

}

export const FriendsSchema = SchemaFactory.createForClass(Friends);