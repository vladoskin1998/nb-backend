import { IDUserDto } from 'src/user/user.dto';
export declare class ParticipantDto {
    userId: string;
}
export declare class NewChatDto {
    participants: ParticipantDto[];
    groupName: string;
    isSupport: boolean;
}
export declare class ChatIDDto {
    chatId: string;
}
export declare class ReadMessageIDDto {
    messageId: string;
}
export declare class AddNewMessageDto extends ChatIDDto {
    senderId: string;
    content: string;
    timestamp: Date;
    isRead: boolean;
    audio: boolean;
    file: null | string;
    like: string;
}
export declare class AddNewVoiceMessageDto extends ChatIDDto {
    senderId: string;
    timestamp: Date;
    isRead: boolean;
    file: null | string;
    like: string;
    audio: boolean;
}
export declare class deleteMessageDto extends AddNewMessageDto {
}
export declare class forwardMessageDto extends ChatIDDto {
    senderId: string;
    senderIdold: string;
    content: string;
    timestamp: Date;
    file: null | string;
    like: string;
    audio: boolean;
}
export declare class deleteLikedMessageDto extends ChatIDDto {
    senderId: string;
    like: string;
    timestamp: Date;
}
export declare class createMessageLikedDto extends deleteLikedMessageDto {
}
export declare class ListChatDto extends IDUserDto {
    isSupport: boolean;
}
