import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { UserIdentity } from "src/user-identity/user-identity.schema";
import { User } from "src/user/user.schema";

export type ChatsDocument = HydratedDocument<Chats>;

@Schema()
export class Chats {
    @Prop({ type: [
        {
            userId: { type: Types.ObjectId, ref: User.name },
        }
    ] })
    participants: {
        userId: Types.ObjectId;
    }[];

    @Prop({ default: false })
    isSupport: boolean;

    @Prop({type: String, default:""})
    groupName: string
}

export const ChatsSchema = SchemaFactory.createForClass(Chats);
