import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { User } from "src/user/user.schema";

export type ChatsDocument = HydratedDocument<Chats>;

@Schema()
export class Chats {

    @Prop({ type: Array })
    participants: {
        userId: string,
        avatarFileName: string,
        fullName: string,
    }[];

    @Prop({default: false})
    isSupport: boolean

}

export const ChatsSchema = SchemaFactory.createForClass(Chats);