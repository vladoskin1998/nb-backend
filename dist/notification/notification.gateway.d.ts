import { NotificationService } from './notification.service';
import { Server, Socket } from 'socket.io';
import { NOTIFICATION_EVENT } from 'src/enum/enum';
import { ChatIDDto } from 'src/messenger/messenger.dto';
export declare class NotificationGateway {
    private readonly notificationService;
    server: Server;
    constructor(notificationService: NotificationService);
    joinNotificationRoom(socket: Socket, userId: string): Promise<void>;
    leaveNotificationRoom(socket: Socket, chatIDDto: ChatIDDto): Promise<void>;
    sendNotificationToRooms(props: {
        rooms: string[];
        ownerId: string;
        title: string;
        fileName: string;
        name: string;
        event: NOTIFICATION_EVENT;
    }): Promise<void>;
    sendNotificationBroadcast(props: {
        ownerId: string;
        title: string;
        fileName: string;
        name: string;
        event: NOTIFICATION_EVENT;
    }): Promise<void>;
}
