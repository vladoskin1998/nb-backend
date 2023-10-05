import { Type } from 'class-transformer';
import { IsString, IsEmail, IsOptional, IsEnum, IsNotEmpty, IsArray, ValidateNested, IsDate, IsBoolean } from 'class-validator';
import { METHOD_REGISTRATION, ROLES } from 'src/enum/enum';

export class ParticipantDto {
    @IsString()
    userId: string

    @IsString()
    avatarFileName: string

    @IsString()
    fullName: string
}

export class NewChatDto {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ParticipantDto)
  participants: ParticipantDto[];

}


export class ChatIDDto {
    @IsString()
    chatId: string;
}


export class AddNewMessageDto extends ChatIDDto{

    @IsString()
    senderId: string;
    
    @IsString()
    content: string

    @IsOptional()
    @IsDate()
    timestamp: Date

    @IsOptional()
    @IsBoolean()
    isRead:boolean
}