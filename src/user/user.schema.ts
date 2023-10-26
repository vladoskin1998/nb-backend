import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { METHOD_REGISTRATION, ROLES, PRIVACY, SEX, ORIENTATION, EDUCATION, FAMILYSTATUS } from 'src/enum/enum';
import { HydratedDocument, Types } from 'mongoose';
import { UserProfession } from 'src/user-identity/user-profession.schema';
import { UserInterests } from 'src/user-identity/user-interests.schema';
import { UserSkills } from 'src/user-identity/user-skills.schema';


export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: ROLES.USER, enum: ROLES})
    role: ROLES;

    @Prop({ default: false })
    isCheckedEmail: boolean;

    @Prop({default: 0})
    codeCheck: number;

    @Prop({ default: "" })
    fullName: string;

    @Prop({ default: "" })
    phone: string;

    @Prop({ default: METHOD_REGISTRATION.JWT })
    methodRegistration: METHOD_REGISTRATION.JWT | METHOD_REGISTRATION.FACEBOOK | METHOD_REGISTRATION.GOOGLE;
}

export const UserSchema = SchemaFactory.createForClass(User);