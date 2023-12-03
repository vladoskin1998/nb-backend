import { IDUserDto } from 'src/user/user.dto';
export declare class ParticipantDto {
    userId: string;
}
export declare class NewChatDto {
    participants: ParticipantDto[];
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
    file: null | string;
}
export declare class ListChatDto extends IDUserDto {
    isSupport: boolean;
}
