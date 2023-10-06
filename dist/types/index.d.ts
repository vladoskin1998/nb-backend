export type MessageType = {
    chatId: string;
    senderId: string;
    content: string;
    timestamp: Date;
    isRead: boolean;
    file: string | null;
};
