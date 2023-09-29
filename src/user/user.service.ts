import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { LocationDto, ProfileTextInfoDTO } from './user.dto';
import { QUALITYENUM, ROLES } from 'src/enum/enum';
import { JwtTokenService } from 'src/auth/jwt-auth.service';
import { FilesService } from 'src/files/files.service';
import { v4 as uuidv4 } from 'uuid';
import { UserIdentityService } from 'src/user-identity/user-identity.service';
import { ProfileSelectDTO } from 'src/user-identity/user-identity.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
        private readonly jwtTokenService: JwtTokenService,
        private readonly filesService: FilesService,
        private readonly userIdentityService: UserIdentityService,
    ) { }

    // async changeLocation(body: LocationDto): Promise<{ isLocationVerify: boolean }> {
    //     try {
    //         const userId = new Types.ObjectId(body._id)
    //         const { lat, lng } = body.coordinates
    //         if (!lat || !lng) {
    //             throw new HttpException("BAD COORDINtes", HttpStatus.BAD_REQUEST)
    //         }
    //         await this.userModel.findByIdAndUpdate(userId,
    //             { ...body, isLocationVerify: true }
    //         )
    //         return { isLocationVerify: true }
    //     } catch (error) {
    //         throw error
    //     }
    // }


    async getUsers({ role, searchName }: { role: ROLES, searchName: string }): Promise<User[]> {
        try {
            if (role !== ROLES.ALLUSERS) {
                return await this.userModel.find(
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

    // async profileUploadAvatar(file: Express.Multer.File, _id: string) {
    //     try {
    //         let user = await this.userModel.findById({ _id })
    //         if (user.avatarFileName) {
    //             await this.filesService.deleteFile(user.avatarFileName, 'uploads/avatar')
    //         }
    //         const avatarFileName = await this.filesService.uploadSingleFile(file, 'uploads/avatar', false)
    //         await user.updateOne({ avatarFileName })
    //         return { avatarFileName }
    //     } catch (error) {
    //         throw error
    //     }
    // }

    // async profileUploadCertificates(files:Array<Express.Multer.File>, _id: string) {
    //     try {
    //         let user = await this.userModel.findById({ _id })
    //         const certificatesFileName = await this.filesService.uploadFiles(files, 'uploads/certificates', false)
    //         await user.updateOne({ certificatesFileName })
    //         return { certificatesFileName }
    //     } catch (error) {
    //         throw error
    //     }
    // }

    // async profileTextInfo(body: ProfileTextInfoDTO) {
    //     const userId = new Types.ObjectId(body._id)
    //     let sanitizedBody = { ...body };
    //     delete sanitizedBody._id
    //     await this.userModel.findOneAndUpdate({ _id: userId }, { ...sanitizedBody })
    //     return sanitizedBody
    // }

    // async profileIdentity(body: ProfileSelectDTO) {

    //     if (body.quality === QUALITYENUM.NATIONALITY) {
    //         await this.profileTextInfo({
    //             _id: body._id,
    //             nationality: body.value
    //         })
    //         return
    //     }

    //     const idList = await this.userIdentityService.checkCreateSkillProfInterest(body)
    //     switch (body.quality) {
    //         case QUALITYENUM.PROFESSION:
    //             await this.profileTextInfo({
    //                 _id: body._id,
    //                 profession: idList.map(item => item._id)
    //             })
    //             break
    //         case QUALITYENUM.INTERESTS:
    //             await this.profileTextInfo({
    //                 _id: body._id,
    //                 interests: idList.map(item => item._id)
    //             })
    //             break
    //         case QUALITYENUM.SKILLS:
    //             await this.profileTextInfo({
    //                 _id: body._id,
    //                 skills: idList.map(item => item._id)
    //             })
    //             break
    //         default:
    //             break;
    //     }
    //     return { [body.quality.toLowerCase()]: idList }
    // }
}
