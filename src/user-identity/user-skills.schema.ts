import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ versionKey: false })
export class UserSkills {

    @Prop({type: String})
    title: string;

}

export type UserSkillsDocument = HydratedDocument<UserSkills>;
export const UserSkillsSchema = SchemaFactory.createForClass(UserSkills);