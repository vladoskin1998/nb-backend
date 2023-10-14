import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MessengerService } from './messenger.service';
import { AddNewMessageDto, ChatIDDto, ListChatDto, NewChatDto, ParticipantDto } from './messenger.dto';
import { IDUserDto } from 'src/user/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('messenger')
export class MessengerController {
    constructor(private readonly messengerService: MessengerService) { }

    @Post('open-chat')
    async openChat(@Body() dto: NewChatDto) {
        const targetChat = await this.messengerService.openChat(dto)
        return targetChat
    }

    @Post('list-chat')
    async listChat(
        @Body() dto: ListChatDto
    ) {
        const userChatList = await this.messengerService.listChat(dto)
        return userChatList
    }

    @Post('list-message')
    async getChatHistory(
        @Body() dto: ChatIDDto
    ) {
        const history = await this.messengerService.getChatHistory(dto)
        return history
    }

    @Post('file-message')
    @UseInterceptors(FileInterceptor('file'))
    async messageFile(
        @UploadedFile() file: Express.Multer.File,
    ) {
        return await this.messengerService.fileMessage(file)
    }
}
