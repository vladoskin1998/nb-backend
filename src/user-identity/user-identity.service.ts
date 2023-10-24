import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { QUALITYENUM } from 'src/enum/enum';
import { COUNTRIES, LOCAL_COUNTRIES } from 'src/utils/countries';
import { UserProfession } from './user-profession.schema';
import { Model, ObjectId, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserInterests } from './user-interests.schema';
import { UserSkills } from './user-skills.schema';
import { LocationDto, ProfileSelectDTO, ProfileTextInfoDTO } from './user-identity.dto';
import { UserIdentity } from './user-identity.schema';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class UserIdentityService {

    constructor(
        @InjectModel(UserIdentity.name)
        private readonly userIdentity: Model<UserIdentity>,
        @InjectModel(UserProfession.name)
        private readonly userProfession: Model<UserProfession>,
        @InjectModel(UserInterests.name)
        private readonly userInterests: Model<UserInterests>,
        @InjectModel(UserSkills.name)
        private readonly userSkills: Model<UserSkills>,
        private readonly filesService: FilesService,
    ) { }


    async getIdentityInforamation(_id: string) {
        try {
            console.log("getIdentityInforamation--->",_id);
            
            const userId = new Types.ObjectId(_id)
            let userIdentity = await this.userIdentity.findOne({ user: userId })
            const userIdentityId = userIdentity?._id
            if (!userIdentity) {
                return await this.userIdentity.create({ user: userId })
            }

            const profession = await this.userProfession.find({
                _id: { $in: userIdentity.profession },
            });
            const interests = await this.userInterests.find({
                _id: { $in: userIdentity.interests },
            });
            const skills = await this.userSkills.find({
                _id: { $in: userIdentity.skills },
            });

            const userIdentityObject = userIdentity.toObject()
            return { ...userIdentityObject, profession, interests, skills, userIdentityId }
        } catch (error) {
            throw error
        }
    }

    async changeLocation(body: LocationDto): Promise<{ isLocationVerify: boolean }> {
        try {
            const userId = new Types.ObjectId(body._id)
            const { lat, lng } = body.coordinates
            if (!lat || !lng) {
                throw new HttpException("BAD COORDINtes", HttpStatus.BAD_REQUEST)
            }
            delete body._id

            const identity = await this.userIdentity.findOneAndUpdate({ user: userId },
                { ...body, isLocationVerify: true }
            )

            return { isLocationVerify: true }
        } catch (error) {
            throw error
        }
    }


    async profileUploadAvatar(file: Express.Multer.File, _id: string) {
        const userId = new Types.ObjectId(_id)
        try {
            let user = await this.userIdentity.findOne({ user: userId })
            if (user.avatarFileName) {
                await this.filesService.deleteFile(user.avatarFileName, 'uploads/avatar')
            }
            const avatarFileName = await this.filesService.uploadSingleFile(file, 'uploads/avatar', false)
            await user.updateOne({ avatarFileName })
            return { avatarFileName }
        } catch (error) {
            throw error
        }
    }

    async profileUploadCertificates(files: Array<Express.Multer.File>, _id: string) {
        const userId = new Types.ObjectId(_id)
        try {
            let user = await this.userIdentity.findOne({ user: userId })
            const certificatesFileName = await this.filesService.uploadFiles(files, 'uploads/certificates', false)
            await user.updateOne({ certificatesFileName })
            return { certificatesFileName }
        } catch (error) {
            throw error
        }
    }

    async profileTextInfo(body: ProfileTextInfoDTO) {
        const userId = new Types.ObjectId(body._id)
        let sanitizedBody = { ...body };
        delete sanitizedBody._id
        await this.userIdentity.findOneAndUpdate({ user: userId }, { ...sanitizedBody })
        return sanitizedBody
    }

    async profileIdentity(body: ProfileSelectDTO) {

        if (body.quality === QUALITYENUM.NATIONALITY) {
            await this.profileTextInfo({
                _id: body._id,
                nationality: body.value
            })
            return  { [body.quality.toLowerCase()]: body.value } 
        }

        const idList = await this.checkCreateSkillProfInterest(body)
        switch (body.quality) {
            case QUALITYENUM.PROFESSION:
                await this.profileTextInfo({
                    _id: body._id,
                    profession: idList.map(item => item._id)
                })
                break
            case QUALITYENUM.INTERESTS:
                await this.profileTextInfo({
                    _id: body._id,
                    interests: idList.map(item => item._id)
                })
                break
            case QUALITYENUM.SKILLS:
                await this.profileTextInfo({
                    _id: body._id,
                    skills: idList.map(item => item._id)
                })
                break
            default:
                break;
        }
        return { [body.quality.toLowerCase()]: idList }
    }

    async getCountriesList(country: string) {
        if (!country) {
            return LOCAL_COUNTRIES
        }
        const regex = new RegExp(`^${country}`, 'i');

        const filteredCountries = COUNTRIES.filter(country => {
            return regex.test(country.title);
        });

        return filteredCountries.slice(0, 15)
    }

    async getPopularCountriesList() {
        return LOCAL_COUNTRIES
    }

    private getModelByQuality(quality: QUALITYENUM): Model<UserProfession> {
        switch (quality) {
            case QUALITYENUM.PROFESSION:
                return this.userProfession;
            case QUALITYENUM.INTERESTS:
                return this.userInterests;
            case QUALITYENUM.SKILLS:
                return this.userSkills;
            default:
                return this.userProfession;
        }
    }

    async getSkillProfInterest(searchValues: string, quality: QUALITYENUM) {

        let model = this.getModelByQuality(quality)

        if (!searchValues) {
            return await this.getPopularSkillProfInterest(quality)
        }

        let filteredList: any = await model.find(
            {
                title: searchValues,
                fullName: { $regex: searchValues, $options: 'i' }
            }
        ).limit(10)

        if (!filteredList.length) {
            filteredList = [{ _id: "", title: searchValues }]
        }

        return filteredList

    }

    async getPopularSkillProfInterest(quality: QUALITYENUM) {

        let model: Model<UserProfession> = this.getModelByQuality(quality)

        return await model.find().limit(10)
    }

    async checkCreateSkillProfInterest(body: ProfileSelectDTO): Promise<{ title: string, _id: string }[]> {
        let model = this.getModelByQuality(body.quality)

        const filteredValue = body.value
            .filter((item) => item._id === "")
            .map(item => ({ title: item.title }));

        const filteredWithIdValue = body.value
            .filter((item) => item._id !== "")

        const createdDocs = await model.create(filteredValue);
        const withIdToString = createdDocs.map(item => ({ title: item.title, _id: item._id.toString() }))

        return [...filteredWithIdValue, ...withIdToString]
    }
}
