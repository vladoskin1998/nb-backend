import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ChangePasswordDTO, UserTextInfoDTO } from './user.dto';
import { ROLES } from 'src/enum/enum';
import { JwtTokenService } from 'src/auth/jwt-auth.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
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

    async userChangePassword(body: ChangePasswordDTO) {
        try {
            const { password, newPassword1, newPassword2 } = body
            const userId = new Types.ObjectId(body._id)

            const user = await this.userModel.findById({ _id: userId }).select('-isValidationUser');
            if (!user) {
                throw new HttpException(
                    `User not found`,
                    HttpStatus.BAD_REQUEST,
                );
            }

            const isPassEquals = await bcrypt.compare(password, user.password);
            if (!isPassEquals) {
                throw new HttpException(`Bad password`, HttpStatus.BAD_REQUEST);
            }

            if (newPassword1 !== newPassword2) {
                throw new HttpException("New passwords have not arrived", HttpStatus.BAD_REQUEST)
            }

            const hashPassword = await bcrypt.hash(newPassword1, 3);

            await user.updateOne({ password: hashPassword })

            return "Password successful changed"
        } catch (error) {

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
}
