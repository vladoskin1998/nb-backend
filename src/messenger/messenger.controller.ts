import { Body, Controller, Post } from '@nestjs/common';
import { MessengerService } from './messenger.service';
import { AddNewMessageDto, ChatIDDto, NewChatDto, ParticipantDto } from './messenger.dto';
import { IDUserDto } from 'src/user/user.dto';

@Controller('messenger')
export class MessengerController {
  constructor(private readonly messengerService: MessengerService) {}

  @Post('open-chat')
  async openChat(@Body() dto: NewChatDto) {
    const targetChat = await this.messengerService.openChat(dto)
    return targetChat
  }

  @Post('list-chat')
  async listChat(
    @Body() dto: IDUserDto
    ) {
    const userChatList = await this.messengerService.listChat(dto)
    return userChatList
  }

  @Post('list-message')
  async getChatHistory(
    @Body() dto: ChatIDDto
  ){
    const history = await this.messengerService.getChatHistory(dto)
    return history
  }
}