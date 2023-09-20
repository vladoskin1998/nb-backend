import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { LocationDto } from './user.dto';
import { ROLES } from 'src/enum/enum';
import { JwtTokenService } from 'src/auth/jwt-auth.service';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
        private readonly jwtTokenService: JwtTokenService
    ) { }

    async changeLocation(body: LocationDto): Promise<{ isLocationVerify: boolean }> {
        try {
            const userId = new Types.ObjectId(body._id)
            const { lat, lng } = body.coordinates
            if (!lat || !lng) {
                throw new HttpException("BAD COORDINtes", HttpStatus.BAD_REQUEST)
            }
            await this.userModel.findByIdAndUpdate(userId,
                { ...body, isLocationVerify: true }
            )
            return { isLocationVerify: true }
        } catch (error) {
            throw error
        }
    }


    async getUsers({role, searchName}: {role:ROLES, searchName:string}): Promise<User[]> {
        try {
            if (role !== ROLES.ALLUSERS) {
                return this.userModel.find(
                    { 
                        role, 
                        fullName: { $regex: searchName, $options: 'i' }
                    }
                ).select('-password');
            }
            return await this.userModel.find(
                { 
                    fullName: { $regex: searchName, $options: 'i' }
                }
            ).select('-password');
        } catch (error) {
            throw error
        }
    }

    async deleteUser(_id: string) {
        try {
            const userId = new Types.ObjectId(_id)
            await this.jwtTokenService.deleteToken(userId)
            await this.userModel.deleteOne({ _id: userId })
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
}
