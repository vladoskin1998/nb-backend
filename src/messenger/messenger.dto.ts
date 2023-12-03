import { Type } from 'class-transformer';
import { IsString, IsEmail, IsOptional, IsEnum, IsNotEmpty, IsArray, ValidateNested, IsDate, IsBoolean, IsEmpty, Validate } from 'class-validator';
import { METHOD_REGISTRATION, ROLES } from 'src/enum/enum';
import { IDUserDto } from 'src/user/user.dto';
import { isNullOrString } from 'src/utils/utils';

export class ParticipantDto {
    @IsString()
    userId: string
}

export class NewChatDto {
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ParticipantDto)
    participants: ParticipantDto[];

    @IsOptional()
    @IsBoolean()
    isSupport: boolean
}


export class ChatIDDto {
    @IsString()
    chatId: string;
}

export class ReadMessageIDDto {
    @IsString()
    messageId: string;

    
}

export class AddNewMessageDto extends ChatIDDto {

    @IsString()
    senderId: string;

    @IsString()
    content: string

    @IsOptional()
    @IsDate()
    timestamp: Date

    @IsOptional()
    @IsBoolean()
    isRead: boolean

    @IsOptional()
    @Validate(isNullOrString)
    file: null | string

}


export class ListChatDto extends IDUserDto{
    @IsOptional()
    @IsBoolean()
    isSupport: boolean
}