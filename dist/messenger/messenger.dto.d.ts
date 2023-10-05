export declare class ParticipantDto {
    userId: string;
    avatarFileName: string;
    fullName: string;
}
export declare class NewChatDto {
    participants: ParticipantDto[];
}
export declare class ChatIDDto {
    chatId: string;
}
export declare class AddNewMessageDto extends ChatIDDto {
    senderId: string;
    content: string;
    timestamp: Date;
    isRead: boolean;
}