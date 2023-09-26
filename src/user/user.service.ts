import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { LocationDto, ProfileTextInfoDTO } from './user.dto';
import { ROLES } from 'src/enum/enum';
import { JwtTokenService } from 'src/auth/jwt-auth.service';
import { FilesService } from 'src/files/files.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
        private readonly jwtTokenService: JwtTokenService,
        private readonly filesService:FilesService
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

    async profileUploadAvatar(file: Express.Multer.File, _id:string){
        try {
    
            let user =  await this.userModel.findById({_id})
            console.log("user",user);
            
            if(user.avatarFileName){
                await this.filesService.deleteFile(user.avatarFileName,'uploads/avatar')
            }
            const avatarName = uuidv4()
            file.originalname = avatarName
            const avatarFileName = await this.filesService.uploadSingleFile(file, 'uploads/avatar') 
            await user.updateOne({avatarFileName})
            return {avatarFileName}
        } catch (error) {
            throw error
        }
    }

    async profileTextInfo(body:ProfileTextInfoDTO){4
        const userId = new Types.ObjectId(body._id)
        let sanitizedBody = { ...body };
        delete sanitizedBody._id
        await this.userModel.findOneAndUpdate({_id:userId}, {...sanitizedBody})
        return sanitizedBody
    }
         
}
