import { NotificationService } from './notification.service';
import { Server, Socket } from 'socket.io';
import { NOTIFICATION_EVENT } from 'src/enum/enum';
import { UserIdentityService } from 'src/user-identity/user-identity.service';
export declare class NotificationGateway {
    private readonly notificationService;
    private readonly userIdentityService;
    server: Server;
    constructor(notificationService: NotificationService, userIdentityService: UserIdentityService);
    joinNotificationRoom(socket: Socket, userId: string): Promise<void>;
    leaveNotificationRoom(socket: Socket, userId: string): Promise<void>;
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
