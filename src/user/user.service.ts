import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AddFriendDto, ClosestUserDto, IDUserDto, UserTextInfoDTO } from './user.dto';
import { ROLES } from 'src/enum/enum';
import { JwtTokenService } from 'src/auth/jwt-auth.service';
import * as bcrypt from 'bcrypt';
import { UserIdentity } from 'src/user-identity/user-identity.schema';
import { getDistance } from 'src/utils/utils';
import { Friends } from './friends.schema';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,

        @InjectModel(UserIdentity.name)
        private userIdentityModel: Model<UserIdentity>,

        @InjectModel(Friends.name)
        private friendsModel: Model<Friends>,

        private readonly jwtTokenService: JwtTokenService,

    ) { }

    async getUsers({ _id, role, searchName }: { _id: string; role: ROLES; searchName: string }): Promise<User[]> {
        try {
            let query: any = { fullName: { $regex: searchName, $options: 'i' } };

            if (role !== ROLES.ALLUSERS) {
                query.role = role;
            }

            if (_id) {
                query._id = { $ne: _id };
            }

            return await this.userModel.find(query).select('-password');
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(_id: string) {
        try {
            const userId = new Types.ObjectId(_id)
            await this.jwtTokenService.deleteToken(userId)
            await this.userModel.deleteOne({ _id: userId })
            //добавить все модели где юзер айди равно удаленному юзеру что бы удалить все связаное
        } catch (error) {
            throw error
        }
    }

    async blockUser(_id: string) {
        try {
            const userId = new Types.ObjectId(_id)
            await this.userModel.findByIdAndUpdate({ _id: userId }, { role: ROLES.BLOCKED, blockedUserDate: new Date() })
        } catch (error) {
            throw error
        }
    }


    async userTextInfo(body: UserTextInfoDTO) {
        try {
            const userId = new Types.ObjectId(body._id)
            let sanitizedBody = { ...body };
            delete sanitizedBody._id

            let isUniq = false
            if (body?.email) {
                isUniq = await this.userModel.findOne({ email: body?.email })
            }
            if (isUniq) {
                throw new HttpException(`Email is NOT uniq`, HttpStatus.BAD_REQUEST);
            }

            await this.userModel.findOneAndUpdate({ _id: userId }, { ...sanitizedBody })
            return sanitizedBody
        } catch (error) {
            throw error
        }
    }



    async checkUsersExist(userIds: string[]): Promise<{
        _id: Types.ObjectId;
    }[]> {
        const userExistPromises = userIds.map(async (userId) => {
            const userExists = await this.userModel.exists({ _id: new Types.ObjectId(userId) });
            return userExists;
        });

        const userExistResults = await Promise.all(userExistPromises);

        return userExistResults;
    }

    async getClosestUserByRole(body: ClosestUserDto) {
        const { role, myLat, myLng } = body;

        const usersByRole = await this.userModel.find({ role }).select('_id fullName')

        console.log(usersByRole);

        const userWithCoord = await Promise.all(
            usersByRole.map(
                async (item) => {
                    const userId = new Types.ObjectId(item._id)
                    const { coordinates, avatarFileName } = await this.userIdentityModel.findOne({ user: userId }).select('avatarFileName coordinates')
                    return { ...item.toObject(), avatarFileName, coordinates }
                }
            )
        )



        let closestUser = null;
        let minDistance = Infinity;

        for (const user of userWithCoord) {
            const distance = getDistance({
                myLat,
                myLng,
                lat: user.coordinates.lat,
                lng: user.coordinates.lng
            }

            );

            if (distance < minDistance) {
                minDistance = distance;
                closestUser = user;
            }
        }

        return {
            ...closestUser, userId: closestUser._id
        }
    }



    async getMyFriends(
        body: IDUserDto
    ) {
        try {
            const userId = new Types.ObjectId(body._id)
            const friends = await this.friendsModel.find({ userId }).populate({
                path: 'friendId',
                select: 'fullName email phone role',
                options: { sort: { fullName: 1 } }
            })
            return friends
        } catch (error) {

        }
    }

    async checkToMyFriend(body: AddFriendDto) {
        try {
            const userId = new Types.ObjectId(body._id)
            const friendId = new Types.ObjectId(body.friendId)
            const isAlredyExistFriend = await this.friendsModel.findOne({
                $and: [
                    { userId },
                    { friendId },
                ],
            })
            console.log( isAlredyExistFriend);
            
            return Boolean(isAlredyExistFriend)
        } catch (error) {
            throw new error
        }
       
    }


    async addToMyFriend(
        body: AddFriendDto
    ) {
        try {
            const userId = new Types.ObjectId(body._id)
            const friendId = new Types.ObjectId(body.friendId)
            const isAlredyExistFriend = await this.checkToMyFriend(body)
            
            if (isAlredyExistFriend) {
                throw new HttpException(
                    `Friend already added`,
                    HttpStatus.BAD_REQUEST,
                );
            }

            const friend = await this.friendsModel.create({ userId, friendId })

            return await friend.populate({
                path: 'friendId',
                select: 'fullName email phone role'
            })

        } catch (error) {
            throw new error
        }
    }


    async deleteMyFriend(
        body: AddFriendDto
    ) {
        try {
            const userId = new Types.ObjectId(body._id)
            const friendId = new Types.ObjectId(body.friendId)
            const friend = await this.friendsModel.findOneAndRemove({
                $and: [
                    { userId },
                    { friendId },
                ],
            })

            return friend
        } catch (error) {
            throw new error
        }
    }



}
