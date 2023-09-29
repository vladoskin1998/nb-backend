"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserIdentityService = void 0;
const common_1 = require("@nestjs/common");
const enum_1 = require("../enum/enum");
const countries_1 = require("../utils/countries");
const user_profession_schema_1 = require("./user-profession.schema");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const user_interests_schema_1 = require("./user-interests.schema");
const user_skills_schema_1 = require("./user-skills.schema");
const user_identity_schema_1 = require("./user-identity.schema");
const files_service_1 = require("../files/files.service");
let UserIdentityService = class UserIdentityService {
    constructor(userIdentity, userProfession, userInterests, userSkills, filesService) {
        this.userIdentity = userIdentity;
        this.userProfession = userProfession;
        this.userInterests = userInterests;
        this.userSkills = userSkills;
        this.filesService = filesService;
    }
    async getIdentityInforamation(_id) {
        try {
            const userId = new mongoose_1.Types.ObjectId(_id);
            const userIdentity = await this.userIdentity.findOne({ user: userId }).select("-_id");
            if (!userIdentity) {
                return await this.userIdentity.create({ user: userId });
            }
            return userIdentity;
        }
        catch (error) {
            throw error;
        }
    }
    async changeLocation(body) {
        try {
            const userId = new mongoose_1.Types.ObjectId(body._id);
            console.log(body._id);
            const { lat, lng } = body.coordinates;
            if (!lat || !lng) {
                throw new common_1.HttpException("BAD COORDINtes", common_1.HttpStatus.BAD_REQUEST);
            }
            delete body._id;
            const identity = await this.userIdentity.findOneAndUpdate({ user: userId }, Object.assign(Object.assign({}, body), { isLocationVerify: true }));
            console.log(identity);
            return { isLocationVerify: true };
        }
        catch (error) {
            throw error;
        }
    }
    async profileUploadAvatar(file, _id) {
        const userId = new mongoose_1.Types.ObjectId(_id);
        try {
            let user = await this.userIdentity.findOne({ user: userId });
            if (user.avatarFileName) {
                await this.filesService.deleteFile(user.avatarFileName, 'uploads/avatar');
            }
            const avatarFileName = await this.filesService.uploadSingleFile(file, 'uploads/avatar', false);
            await user.updateOne({ avatarFileName });
            return { avatarFileName };
        }
        catch (error) {
            throw error;
        }
    }
    async profileUploadCertificates(files, _id) {
        const userId = new mongoose_1.Types.ObjectId(_id);
        try {
            let user = await this.userIdentity.findOne({ user: userId });
            const certificatesFileName = await this.filesService.uploadFiles(files, 'uploads/certificates', false);
            await user.updateOne({ certificatesFileName });
            return { certificatesFileName };
        }
        catch (error) {
            throw error;
        }
    }
    async profileTextInfo(body) {
        const userId = new mongoose_1.Types.ObjectId(body._id);
        let sanitizedBody = Object.assign({}, body);
        delete sanitizedBody._id;
        await this.userIdentity.findOneAndUpdate({ user: userId }, Object.assign({}, sanitizedBody));
        return sanitizedBody;
    }
    async profileIdentity(body) {
        if (body.quality === enum_1.QUALITYENUM.NATIONALITY) {
            await this.profileTextInfo({
                _id: body._id,
                nationality: body.value
            });
            return;
        }
        const idList = await this.checkCreateSkillProfInterest(body);
        switch (body.quality) {
            case enum_1.QUALITYENUM.PROFESSION:
                await this.profileTextInfo({
                    _id: body._id,
                    profession: idList.map(item => item._id)
                });
                break;
            case enum_1.QUALITYENUM.INTERESTS:
                await this.profileTextInfo({
                    _id: body._id,
                    interests: idList.map(item => item._id)
                });
                break;
            case enum_1.QUALITYENUM.SKILLS:
                await this.profileTextInfo({
                    _id: body._id,
                    skills: idList.map(item => item._id)
                });
                break;
            default:
                break;
        }
        return { [body.quality.toLowerCase()]: idList };
    }
    async getCountriesList(country) {
        if (!country) {
            return countries_1.LOCAL_COUNTRIES;
        }
        const regex = new RegExp(`^${country}`, 'i');
        const filteredCountries = countries_1.COUNTRIES.filter(country => {
            return regex.test(country.title);
        });
        return filteredCountries.slice(0, 15);
    }
    async getPopularCountriesList() {
        return countries_1.LOCAL_COUNTRIES;
    }
    getModelByQuality(quality) {
        switch (quality) {
            case enum_1.QUALITYENUM.PROFESSION:
                return this.userProfession;
            case enum_1.QUALITYENUM.INTERESTS:
                return this.userInterests;
            case enum_1.QUALITYENUM.SKILLS:
                return this.userSkills;
            default:
                return this.userProfession;
        }
    }
    async getSkillProfInterest(searchValues, quality) {
        let model = this.getModelByQuality(quality);
        if (!searchValues) {
            return await this.getPopularSkillProfInterest(quality);
        }
        let filteredList = await model.find({
            title: searchValues,
            fullName: { $regex: searchValues, $options: 'i' }
        }).limit(10);
        if (!filteredList.length) {
            filteredList = [{ _id: "", title: searchValues }];
        }
        return filteredList;
    }
    async getPopularSkillProfInterest(quality) {
        let model = this.getModelByQuality(quality);
        return await model.find().limit(10);
    }
    async checkCreateSkillProfInterest(body) {
        let model = this.getModelByQuality(body.quality);
        const filteredValue = body.value
            .filter((item) => item._id === "")
            .map(item => ({ title: item.title }));
        const filteredWithIdValue = body.value
            .filter((item) => item._id !== "");
        const createdDocs = await model.create(filteredValue);
        const withIdToString = createdDocs.map(item => ({ title: item.title, _id: item._id.toString() }));
        return [...filteredWithIdValue, ...withIdToString];
    }
};
UserIdentityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_identity_schema_1.UserIdentity.name)),
    __param(1, (0, mongoose_2.InjectModel)(user_profession_schema_1.UserProfession.name)),
    __param(2, (0, mongoose_2.InjectModel)(user_interests_schema_1.UserInterests.name)),
    __param(3, (0, mongoose_2.InjectModel)(user_skills_schema_1.UserSkills.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        files_service_1.FilesService])
], UserIdentityService);
exports.UserIdentityService = UserIdentityService;
//# sourceMappingURL=user-identity.service.js.map