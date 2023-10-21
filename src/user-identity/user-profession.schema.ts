import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/user/user.schema';

@Schema({ versionKey: false })
export class UserProfession {
    @Prop({ type: String })
    title: string;
}

export type UserProfessionDocument = HydratedDocument<UserProfession>;
export const UserProfessionSchema = SchemaFactory.createForClass(UserProfession);