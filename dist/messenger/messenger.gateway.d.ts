import { Server, Socket } from 'socket.io';
import { MessengerService } from './messenger.service';
import { ChatIDDto } from './messenger.dto';
import { MessageType } from '../types';
export declare class MessengerGateway {
    private messengerService;
    server: Server;
    constructor(messengerService: MessengerService);
    joinRoom(socket: Socket, chatId: string): Promise<void>;
    leaveRoom(socket: Socket, chatIDDto: ChatIDDto): Promise<void>;
    handleMessage(payload: MessageType, socket: Socket): Promise<void>;
}
