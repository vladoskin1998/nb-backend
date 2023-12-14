import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { User } from "src/user/user.schema";
import { Chats } from "./chats.schema";


export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {

    @Prop({ type: Types.ObjectId, ref: Chats.name })
    chatId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: User.name })
    senderId: Types.ObjectId;

    @Prop({ type: String })
    content: string

    @Prop({ type: String })
    like:string

    @Prop({ type: Date, default: new Date(), required: false })
    timestamp: Date

    @Prop({ type: Boolean, default: false })
    isRead: boolean

    @Prop({ type: String, default: null })
    file: string

    @Prop({type: Boolean, default:false})
    audio: boolean

    @Prop({ type: Types.ObjectId})
    senderIdold: Types.ObjectId;

    
    @Prop({type: Boolean, default:false})
    forward: boolean

}

export const MessageSchema = SchemaFactory.createForClass(Message);