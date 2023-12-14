// import { Injectable } from '@nestjs/common';
// import { AddNewMessageDto, ChatIDDto, ListChatDto, NewChatDto, ParticipantDto, ReadMessageIDDto } from './messenger.dto';
// import { InjectModel } from '@nestjs/mongoose';
// import { Chats } from './chats.schema';
// import { Model, Types } from 'mongoose';
// import { UserService } from 'src/user/user.service';
// import { Message, MessageSchema } from './message.schema';
// import { User } from 'src/user/user.schema';
// import { UserIdentity } from 'src/user-identity/user-identity.schema';
// import { MessageType } from '../types'
// import { IDUserDto } from 'src/user/user.dto';
// import { FilesService } from 'src/files/files.service';
// import { NotificationService } from 'src/notification/notification.service';
// import { NOTIFICATION_EVENT } from 'src/enum/enum';
// @Injectable()
// export class MessengerService {

//     constructor(
//         @InjectModel(UserIdentity.name) private userIdentityModel: Model<UserIdentity>,
//         @InjectModel(User.name) private userModel: Model<User>,
//         @InjectModel(Chats.name) private chatsModel: Model<Chats>,
//         @InjectModel(Message.name) private messageModel: Model<Message>,
//         private filesService: FilesService,
//         private notificationService: NotificationService
//     ) { }

//     async openChat(dto: NewChatDto) {
//         try {

//             console.log(dto);

//             const userIds = dto.participants.map(item => new Types.ObjectId(item.userId))

//             const existingChat = await this.chatsModel.findOne({
//                 'participants.userId': { $all: userIds },
//             })

//             if (existingChat) {
//                 return {
//                     participants: existingChat.participants,
//                     chatId: existingChat._id,
//                     isSupport: existingChat.isSupport,
//                 };
//             }

//             const newChat = await this.chatsModel.create({ participants: dto.participants, isSupport: dto.isSupport });
//             return {
//                 participants: newChat?.participants,
//                 chatId: newChat._id,
//                 isSupport: newChat.isSupport
//             };
//         } catch (error) {
//             console.error('Error in openChat:', error);
//             throw new Error('SERVER ERROR openChat')
//         }
//     }

//     async listChat(dto: ListChatDto) {
//         try {
//             const userId = dto._id;

//             const chats = await this.chatsModel.find({
//                 participants: { $elemMatch: { userId: userId } },
//                 isSupport: dto.isSupport
//             }).populate({ path: 'participants.userId', model: 'User' })

//             const chatsWithLastMessage = await Promise.all(
//                 chats.map(async (item) => {
//                     const message = await this.messageModel.findOne({ chatId: item._id }).sort({ timestamp: -1 });
//                     const notReadingMessage = await this.messageModel.find({
//                         $and: [
//                             { $nor: [{ senderId: new Types.ObjectId(userId)  }] },
//                             { isRead: false },
//                         ],
//                     }
//                     ).select( 'isRead' )
                    
//                     return {
//                         participants: item.toObject().participants,
//                         chatId: item._id,
//                         lastMessage: message ? message.toObject() : null,
//                         isSupport: item.isSupport,
//                         notReadingMessage,
                        
//                     };
//                 })
//             );

//             return chatsWithLastMessage.reverse();
//         } catch (error) {
//             throw new Error('SERVER ERROR');
//         }
//     }


//     async getChatHistory(dto: ChatIDDto) {
//         try {

//             const chatId = new Types.ObjectId(dto.chatId)
//             const history = await this.messageModel.aggregate([
//                 { $match: { chatId } },
//                 { $addFields: { messageId: '$_id' } },
//             ]);
//             return history || []
//         } catch (error) {
//             throw new Error('SERVER ERROR')
//         }
//     }



//     async readMessage({ messageId }: ReadMessageIDDto) {
//         try {
//             await this.messageModel.findOneAndUpdate({ _id: new Types.ObjectId(messageId)}, { isRead: true })
//         } catch (error) {

//         }
//     }


//     async fileMessage(file: Express.Multer.File) {
//         try {
//             return await this.filesService.uploadSingleFile(file, 'uploads/messenger', false)
//         } catch (error) {
//             throw error
//         }
//     }
// }
import { Injectable } from '@nestjs/common';
import { AddNewMessageDto, AddNewVoiceMessageDto, ChatIDDto, ListChatDto, NewChatDto, ParticipantDto, ReadMessageIDDto, createMessageLikedDto, deleteLikedMessageDto, deleteMessageDto, forwardMessageDto } from './messenger.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Chats } from './chats.schema';
import { Model, Types } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { Message, MessageSchema } from './message.schema';
import { User } from 'src/user/user.schema';
import { UserIdentity } from 'src/user-identity/user-identity.schema';
import { MessageType } from '../types'
import { IDUserDto } from 'src/user/user.dto';
import { FilesService } from 'src/files/files.service';
import { NotificationService } from 'src/notification/notification.service';
import { NOTIFICATION_EVENT } from 'src/enum/enum';
import { timestamp } from 'rxjs';
@Injectable()
export class MessengerService {

    constructor(
        @InjectModel(UserIdentity.name) private userIdentityModel: Model<UserIdentity>,
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(Chats.name) private chatsModel: Model<Chats>,
        @InjectModel(Message.name) private messageModel: Model<Message>,
        private filesService: FilesService,
        private notificationService: NotificationService
    ) { }

       async openChat(dto: NewChatDto) {
        try {

            console.log(dto);

            const userIds = dto.participants.map(item => new Types.ObjectId(item.userId))

            const existingChat = await this.chatsModel.findOne({
                'participants.userId': { $all: userIds },
            })

            if (existingChat) {
                return {
                    participants: existingChat.participants,
                    chatId: existingChat._id,
                    isSupport: existingChat.isSupport,
                };
            }

            const newChat = await this.chatsModel.create({ participants: dto.participants, isSupport: dto.isSupport });
            return {
                participants: newChat?.participants,
                chatId: newChat._id,
                isSupport: newChat.isSupport
            };
        } catch (error) {
            console.error('Error in openChat:', error);
            throw new Error('SERVER ERROR openChat')
        }
    }
    async newChat(dto: NewChatDto): Promise<void> {
    try {

        const userIds = dto.participants.map(item => item.userId)
        const groupName = dto.groupName;

        const existingChat = await this.chatsModel.findOne({
            'participants.userId': { $all: userIds },
        });

        if(existingChat){
            await this.chatsModel.updateOne({ participants: dto.participants, isSupport: dto.isSupport, groupName:dto.groupName  });
        }else{
            await this.chatsModel.create({ participants: dto.participants, isSupport: dto.isSupport, groupName:dto.groupName  });

        }


        console.log(groupName);

    } catch (error) {
        throw new Error('SERVER ERROR openChat')
    }
}

    async listChat(dto: ListChatDto) {
        try {
            const userId = dto._id;

            const chats = await this.chatsModel.find({
                participants: { $elemMatch: { userId: userId } },
                isSupport: dto.isSupport
            });

            const chatsWithLastMessage = await Promise.all(
                chats.map(async (item) => {
                    const message = await this.messageModel.findOne({ chatId: item._id }).sort({ timestamp: -1 });
                    return {
                        participants: item.toObject().participants,
                        chatId: item._id,
                        lastMessage: message ? message.toObject() : null,
                        isSupport: item.isSupport,
                        groupName:item.groupName,
                    };
                })
            );

            return chatsWithLastMessage.reverse();
        } catch (error) {
            throw new Error('SERVER ERROR');
        }
    }

    async getChatHistory(dto: ChatIDDto) {
        try {

            const chatId = new Types.ObjectId(dto.chatId)
            const history = await this.messageModel.find({ chatId })
            return history || []
        } catch (error) {
            throw new Error('SERVER ERROR')
        }
    }

     async addMessage(payload: AddNewMessageDto): Promise<{ messageId: string }> {
        try {
            const chatId = new Types.ObjectId(payload.chatId)
            const senderId = new Types.ObjectId(payload.senderId)
            // await this.messageModel.create({ ...payload, chatId, senderId })

            const { participants } = (await this.chatsModel.findOne({ _id: chatId }))
            const rooms = participants.map(item => item.userId.toString())

            const user = await this.userModel.findOne({ _id: senderId })


            await this.notificationService.sendNotification({
                ownerId: payload.senderId,
                rooms,
                fileName: user.avatarFileName,
                title: payload.content,
                name: user.fullName,
                event: NOTIFICATION_EVENT.NOTIFICATION_MESSAGE
            })

            const message = await this.messageModel.create({ ...payload, chatId, senderId, timestamp: new Date(), audio:false, forward:false })
            return { messageId: message._id.toString() }
        } catch (error) {
            throw new Error('SERVER ERROR')
        }
    }

    async deleteLikedMessage(payload: deleteLikedMessageDto):Promise<void>{
        try {
            const likeSenderId = new Types.ObjectId(payload.senderId);
            const messages = await this.messageModel.findOne({
                senderId: likeSenderId,
                timestamp: payload.timestamp
            });
            // console.log(payload.timestamp)
            await this.messageModel.updateOne({_id: new Types.ObjectId(messages._id)}, {like:""});
        } catch (e) {
            throw new Error(e);
        }
    }
    async createLikedMessage(payload: createMessageLikedDto):Promise<void>{
        try {
            const likeSenderId = new Types.ObjectId(payload.senderId);
            const senderId = new Types.ObjectId(payload.senderId);
            const messages = await this.messageModel.findOne({
                senderId: senderId,
                timestamp: payload.timestamp
            });
            await this.messageModel.updateOne({_id: new Types.ObjectId(messages._id)}, {like:payload.like});
            // console.log(payload.timestamp, senderId)
        } catch (e) {
            throw new Error(e);
        }
    }
    async addVoiceMessage(payload: AddNewVoiceMessageDto): Promise<{ messageId: string }> {
        try {
            const chatId = new Types.ObjectId(payload.chatId)
            const senderId = new Types.ObjectId(payload.senderId)

            const { participants } = (await this.chatsModel.findOne({ _id: chatId }))
            const rooms = participants.map(item => item.userId.toString())

            const user = await this.userModel.findOne({ _id: senderId })


            await this.notificationService.sendNotification({
                ownerId: payload.senderId,
                rooms,
                fileName: user.avatarFileName,
                title: "Voice Message",
                name: user.fullName,
                event: NOTIFICATION_EVENT.NOTIFICATION_MESSAGE
            })

            console.log(senderId)
            const message = await this.messageModel.create({ ...payload, chatId, senderId, timestamp: new Date(), forward:false , audio:true, content:"Voice Message" });
            return { messageId: message._id.toString() }
        } catch (error) {
            throw new Error('SERVER ERROR')
        }
    }

    async deleteMessage(payload: deleteMessageDto): Promise<void> {
        try {
            const chatId = new Types.ObjectId(payload.chatId)
            const senderId = new Types.ObjectId(payload.senderId)
            const messages = await this.messageModel.findOne({
                senderId: senderId,
                timestamp: payload.timestamp
            });
            await this.messageModel.deleteOne({_id: new Types.ObjectId(messages._id)});
            console.log(messages, payload.timestamp, senderId);
        } catch (e) {
            throw new Error(e)
        }
    }

    async forwardMessage(payload: forwardMessageDto):Promise<void>{
        try {
            const chatId = new Types.ObjectId(payload.chatId);
            const senderIdold = new Types.ObjectId(payload.senderIdold);
            const senderId = new Types.ObjectId(payload.senderId);
            const senderName = (await this.userModel.findOne(senderIdold)).fullName
            console.log(payload.file)
            await this.messageModel.create({ ...payload, chatId, senderIdold:senderName, timestamp: new Date(), forward:true, senderId:senderId, file:payload.file})
        } catch (e) {
            throw new Error(e);
        }
    }

    
    async readMessage({ messageId }: ReadMessageIDDto) {
        try {
            await this.messageModel.findOneAndUpdate({ _id: new Types.ObjectId(messageId)}, { isRead: true })
        } catch (error) {

        }
    }

    async fileMessage(file: Express.Multer.File) {
        try {
            return await this.filesService.uploadSingleFile(file, 'uploads/messenger', false)
        } catch (error) {
            throw error
        }
    }
}

