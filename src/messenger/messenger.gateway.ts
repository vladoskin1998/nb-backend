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
            'https://maps.googleapis.com', 
            "http://178.20.154.144:5000",
            "http://178.20.154.144:5001",
            "https://environs.life",
            ],
            credentials: true,
        }
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

        socket.join(room);

        console.log("join room----->", this.server.sockets.adapter.rooms);
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
            isRead,
            file,
            like,
            audio
        } = payload

        await this.messengerService.addMessage({
            chatId,
            senderId,
            content,
            timestamp,
            isRead,
            file,
            like,
            audio
        })

        console.log('123');
        // console.log("sendmessage", chatId);
        // console.log("sendmessage room", this.server.sockets.adapter.rooms);

        // socket.to(destinationEmail).emit(SOCKET_MESSENDER_EVENT.NOTIFICATION, currentChatId, sourceEmail)

        socket
            .to(String(chatId))
            .emit(SOCKET_MESSENDER_EVENT.GET_PRIVATE_MESSAGE,
                chatId,
                senderId,
                content,
                timestamp,
                isRead,
                file
            )
    }
    
    @SubscribeMessage(SOCKET_MESSENDER_EVENT.SEND_PRIVATE_VOICE_MESSAGE)
    async handleVoiceMessage(
        @MessageBody() payload: MessageType,
        @ConnectedSocket() socket: Socket,
    ) {
        const {
            chatId,
            senderId,
            timestamp,
            isRead,
            file,
            audio,
            like,
        } = payload

        await this.messengerService.addVoiceMessage({
            chatId,
            senderId,
            timestamp,
            isRead,
            file,
            audio,
            like,
        })

        socket
            .to(String(chatId))
            .emit(SOCKET_MESSENDER_EVENT.GET_PRIVATE_MESSAGE,
                chatId,
                senderId,
                timestamp,
                isRead,
                file,
                audio
            )
    }

    @SubscribeMessage(SOCKET_MESSENDER_EVENT.DELETE_PRIVATE_MESSAGE)
    async findMessage(
        @MessageBody() payload: MessageType,
        @ConnectedSocket() socket: Socket,
    ) {
        const {
            chatId,
            senderId,
            content,
            timestamp,
            isRead,
            file,
            like,
            audio,
        } = payload

        await this.messengerService.deleteMessage({
            chatId,
            senderId,
            content,
            timestamp,
            isRead,
            file,
            like,
            audio,
        })
        socket
            .to(String(chatId))
            .emit(SOCKET_MESSENDER_EVENT.GET_PRIVATE_MESSAGE,
                chatId,
                senderId,
                content,
                timestamp,
                isRead,
                file
            )
    }

    @SubscribeMessage(SOCKET_MESSENDER_EVENT.DELETE_PRIVATE_MESSAGE_LIKE)
    async findLikedMessage(
        @MessageBody() payload: MessageType,
        @ConnectedSocket() socket: Socket,
    ) {
        const {
            chatId,
            senderId,
            timestamp,
            like
        } = payload

        await this.messengerService.deleteLikedMessage({
            chatId,
            senderId,
            timestamp,
            like
        })
        socket
            .to(String(chatId))
            .emit(SOCKET_MESSENDER_EVENT.GET_PRIVATE_MESSAGE,
                chatId,
                senderId,
                timestamp,
                like
            )
    }
    
    @SubscribeMessage(SOCKET_MESSENDER_EVENT.SEND_PRIVATE_MESSAGE_LIKE)
    async createLikedMessage(
        @MessageBody() payload: MessageType,
        @ConnectedSocket() socket: Socket,
    ) {
        const {
            chatId,
            senderId,
            timestamp,
            like
        } = payload

        await this.messengerService.createLikedMessage({
            chatId,
            senderId,
            timestamp,
            like
        })
        socket
            .to(String(chatId))
            .emit(SOCKET_MESSENDER_EVENT.GET_PRIVATE_MESSAGE,
                chatId,
                senderId,
                timestamp,
                like
            )
    }

    @SubscribeMessage(SOCKET_MESSENDER_EVENT.FORWARD_PRIVATE_MESSAGE)
    async findToMessage(
        @MessageBody() payload: MessageType,
        @ConnectedSocket() socket: Socket,
    ) {
        const {
            chatId,
            senderId,
            content,
            timestamp,
            senderIdold,
            file,
            audio,
            like
        } = payload

        await this.messengerService.forwardMessage({
            chatId,
            senderId,
            content,
            timestamp,
            senderIdold,
            file,
            audio,
            like
        })
        socket
            .to(String(chatId))
            .emit(SOCKET_MESSENDER_EVENT.GET_PRIVATE_MESSAGE,
                chatId,
                senderId,
                content,
                timestamp,
                senderIdold,
                audio
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
