import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    ConnectedSocket,
    MessageBody,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { MessengerService } from './messenger.service'
import { SOCKET_MESSENDER_EVENT } from '../enum/enum'
import { SetMetadata, UseGuards } from '@nestjs/common'
import { ChatIDDto } from './messenger.dto'
import { MessageType } from '../types'
// import { ChatAuthGuard } from './guard/chat-auth.guard'
// import { RoomType } from '../types/types'

@WebSocketGateway(5001,
    {
        cors: {
            origin: ['http://localhost:5000',
                'http://localhost:3000',
                "http://5.180.180.221:5000"],
            credentials: true,
        },
    })
export class MessengerGateway {
    @WebSocketServer()
    server: Server

    constructor(
        private messengerService: MessengerService,

    ) { }


    @SubscribeMessage(SOCKET_MESSENDER_EVENT.JOIN_ROOM)
    async joinRoom(
        @ConnectedSocket() socket: Socket,
        @MessageBody() chatId: string
    ) {

        const room = String(chatId);
        console.log(room);

        socket.join(room);

        console.log("join room", this.server.sockets.adapter.rooms);
    }

    @SubscribeMessage(SOCKET_MESSENDER_EVENT.LEAVE_ROOM)
    async leaveRoom(
        @ConnectedSocket() socket: Socket,
        @MessageBody() chatIDDto: ChatIDDto
    ) {
        const { chatId } = chatIDDto;
        console.log("leave room", this.server.sockets.adapter.rooms);
        socket.leave(String(chatId))
    }

    // @SetMetadata("SocketEvent", SOCKET_MESSENDER_EVENT.SEND_PRIVATE_MESSAGE)
    // @UseGuards(ChatAuthGuard)
    @SubscribeMessage(SOCKET_MESSENDER_EVENT.SEND_PRIVATE_MESSAGE)
    async handleMessage(
        @MessageBody() payload: MessageType,
        @ConnectedSocket() socket: Socket,
    ) {
        const {
            chatId,
            senderId,
            content,
            timestamp,
            isRead
        } = payload

        await this.messengerService.addMessage({
            chatId,
            senderId,
            content,
            timestamp,
            isRead
        })

        console.log("sendmessage", chatId);
        console.log("sendmessage room", this.server.sockets.adapter.rooms);

        // socket.to(destinationEmail).emit(SOCKET_MESSENDER_EVENT.NOTIFICATION, currentChatId, sourceEmail)

        socket
            .to(String(chatId))
            .emit(SOCKET_MESSENDER_EVENT.GET_PRIVATE_MESSAGE,
                chatId,
                senderId,
                content,
                timestamp,
                isRead
            )
    }

    // @SubscribeMessage(SOCKET_MESSENDER_EVENT.NEW_CREATE_CHAT)
    // async updateChatList(
    //     @MessageBody() destinationEmail: string,
    //     @ConnectedSocket() socket: Socket,
    // ) {
    //     socket.to(destinationEmail).emit(SOCKET_MESSENDER_EVENT.UPDATE_LIST_CHAT, destinationEmail)
    // }
}
