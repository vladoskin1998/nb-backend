import { Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { LocationDto } from './user.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>) { }

    async changeLocation(body: LocationDto):Promise<{isLocationVerify:boolean}> {
        try {
            const userId = new Types.ObjectId(body.id)
            const {isLocationVerify} = await this.userModel.findByIdAndUpdate(userId, {body, isLocationVerify: true})
            return {isLocationVerify}
        } catch (error) {
            throw error
        }
    }

}
