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
    async getIdentityInforamation(_id, options) {
        try {
            const userId = new mongoose_1.Types.ObjectId(_id);
            if (options && (options === null || options === void 0 ? void 0 : options.length)) {
                const selectOptions = options.reduce((p, s) => `${p} ${s}`, '').trim();
                return await this.userIdentity.findOne({ user: userId }).select(selectOptions);
            }
            let userIdentity = await this.userIdentity.findOne({ user: userId });
            const userIdentityId = userIdentity === null || userIdentity === void 0 ? void 0 : userIdentity._id;
            if (!userIdentity) {
                return await this.userIdentity.create({ user: userId });
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
            const userIdentityObject = userIdentity.toObject();
            return Object.assign(Object.assign({}, userIdentityObject), { profession, interests, skills, userIdentityId });
        }
        catch (error) {
            throw error;
        }
    }
    async changeLocation(body) {
        try {
            const userId = new mongoose_1.Types.ObjectId(body._id);
            const { lat, lng } = body.coordinates;
            if (!lat || !lng) {
                throw new common_1.HttpException("BAD COORDINtes", common_1.HttpStatus.BAD_REQUEST);
            }
            delete body._id;
            const identity = await this.userIdentity.findOneAndUpdate({ user: userId }, Object.assign(Object.assign({}, body), { isLocationVerify: true }));
            return { isLocationVerify: true };
        }
        catch (error) {
            throw error;
        }
    }
    async profileUploadCertificates(files, _id, uploadedCertificates) {
        const userId = new mongoose_1.Types.ObjectId(_id);
        try {
            let user = await this.userIdentity.findOne({ user: userId });
            const missingFiles = user.certificatesFileName.filter((fileName) => !uploadedCertificates.includes(fileName));
            await this.filesService.deleteFiles(missingFiles, 'uploads/certificates');
            const uploadedFiles = await this.filesService.uploadFiles(files, 'uploads/certificates', false);
            const certificatesFileName = [...uploadedCertificates, ...uploadedFiles];
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
            return { [body.quality.toLowerCase()]: body.value };
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
            return countries_1.COUNTRIES;
        }
        const regex = new RegExp(`^${country}`, 'i');
        const filteredCountries = countries_1.COUNTRIES.filter(country => {
            return regex.test(country.title);
        });
        return filteredCountries.slice(0, 15);
    }
    async getPopularCountriesList() {
        return countries_1.COUNTRIES;
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
            title: { $regex: searchValues, $options: 'i' }
        }).limit(10);
        if (!filteredList.length) {
            filteredList = [{ _id: "", title: searchValues }];
        }
        return filteredList;
    }
    async getPopularSkillProfInterest(quality) {
        let model = this.getModelByQuality(quality);
        return await model.find();
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