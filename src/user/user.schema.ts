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

    @Prop({ default: ROLES.ADMIN, enum: [ROLES.ADMIN, ROLES.USER] })
    role: ROLES.ADMIN | ROLES.USER;

    @Prop({ default: false })
    isCheckedEmail: boolean;

    @Prop({ default: "" })
    fullName: string;

    @Prop({ default: METHOD_REGISTRATION.JWT })
    methodRegistration: METHOD_REGISTRATION.JWT | METHOD_REGISTRATION.FACEBOOK | METHOD_REGISTRATION.GOOGLE;

    // @Prop({ type: Object, default: { lat: null, lng: null } })
    // coordinates: { lat: number | null; lng: number | null };

    // @Prop({ default: "" })
    // fullName: string;

    // @Prop({ default: null })
    // city: string | null

    // @Prop({ default: null })
    // country: string | null

    // @Prop({ default: null })
    // street: string | null

    // @Prop({ default: null })
    // houseNumber: string | null

    // @Prop({ default: new Date()  })
    // createdUserDate: Date;

    // @Prop({ default: new Date()  })
    // blockedUserDate: Date;

    // @Prop({ default: null})
    // avatarFileName: string | null;

    // @Prop({ default: 5})
    // step: number;

    // @Prop({ default: PRIVACY.EVERYONE, enum:PRIVACY})
    // privacy: PRIVACY;

    // @Prop({default: ""})
    // aboutMe: string;

    // @Prop({default: null})
    // dateBirth: Date | null

    // @Prop({default: null})
    // cityBirth: string | null

    // @Prop({default: Array})
    // certificatesFileName: string[] | null

    // @Prop({default: null})
    // sex: SEX | null

    // @Prop({default: ORIENTATION.HETERO, enum: ORIENTATION})
    // orientation: ORIENTATION

    // @Prop({default: null })
    // education: EDUCATION | null

    // @Prop({default: null })
    // familyStatus: FAMILYSTATUS | null

    // @Prop({ type: Object, default: [] })
    // nationality: { _id: string | number, title: string }[] | [];

    // @Prop({ type: [{ type: Types.ObjectId, ref: UserProfession.name }], default: null })
    // profession: Types.ObjectId[] | null;

    // @Prop({ type: [{ type: Types.ObjectId, ref: UserInterests.name }], default: null })
    // interests: Types.ObjectId[] | null;

    // @Prop({ type: [{ type: Types.ObjectId, ref: UserSkills.name }], default: null })
    // skills: Types.ObjectId[] | null;
}

export const UserSchema = SchemaFactory.createForClass(User);