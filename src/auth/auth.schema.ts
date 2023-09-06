import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/user/user.schema';

export type AuthenticationDocument = HydratedDocument<Authentication>;

@Schema()
export class Authentication {

    @Prop({ type: Types.ObjectId, ref: User.name }) // Создание ссылки на модель User
    user: Types.ObjectId;

    @Prop({})
    refreshToken: string;

}

export const AuthenticationSchema = SchemaFactory.createForClass(Authentication);