import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { METHOD_REGISTRATION, ROLES } from 'src/enum/enum';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: ROLES.USER, enum: [ROLES.ADMIN, ROLES.USER] })
    role: ROLES.ADMIN | ROLES.USER;

    @Prop({ default: false })
    isValidationUser: boolean;

    @Prop({ default: METHOD_REGISTRATION.JWT })
    methodRegistration: METHOD_REGISTRATION.JWT | METHOD_REGISTRATION.FACEBOOK | METHOD_REGISTRATION.GOOGLE;

    @Prop({ type: Object, default: { lat: null, lng: null } })
    coordinates: { lat: number | null; lng: number | null };

    @Prop({ default: "" })
    fullName: string;

    @Prop({ default: null })
    city: string | null

    @Prop({ default: null })
    country: string | null

    @Prop({ default: null })
    street: string | null

    @Prop({ default: null })
    houseNumber: string | null

    @Prop({ default: false  })
    isLocationVerify: boolean;

    @Prop({ default: new Date()  })
    createdUserDate: Date;

    @Prop({ default: new Date()  })
    blockedUserDate: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);