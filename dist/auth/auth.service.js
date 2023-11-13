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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../user/user.schema");
const mongoose_2 = require("mongoose");
const enum_1 = require("../enum/enum");
const bcrypt = require("bcrypt");
const mail_service_1 = require("../mailer/mail.service");
const jwt_auth_service_1 = require("./jwt-auth.service");
const uuid_1 = require("uuid");
const utils_1 = require("../utils/utils");
const sms_service_1 = require("../sms/sms.service");
let AuthService = class AuthService {
    constructor(userModel, jwtTokenService, mailService, smsService) {
        this.userModel = userModel;
        this.jwtTokenService = jwtTokenService;
        this.mailService = mailService;
        this.smsService = smsService;
    }
    async messengerLogin(user) {
        const { email, methodRegistration } = user;
        console.log(email, methodRegistration);
        if (!user) {
            throw new common_1.HttpException(`No user from ${methodRegistration}`, common_1.HttpStatus.BAD_REQUEST);
        }
        const candidate = await this.userModel.findOne({ email });
        if (!candidate) {
            const uuidPwd = (0, uuid_1.v4)();
            const password = await bcrypt.hash(uuidPwd, 3);
            return await this.registration({
                email,
                password,
                methodRegistration,
                fullName: 'Neighbor'
            });
        }
        return await this.login({ email, password: candidate === null || candidate === void 0 ? void 0 : candidate.password, methodRegistration });
    }
    async registration({ email, password, methodRegistration, fullName }) {
        console.log("methodRegistration", methodRegistration);
        const candidate = await this.userModel.findOne({ email }).select('-isValidationUser -password');
        if (candidate) {
            throw new common_1.HttpException(`User ${email} already created`, common_1.HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const codeCheck = (0, utils_1.generateRandomFourDigitCode)();
        let isCheckedEmail = true;
        if (methodRegistration === enum_1.METHOD_REGISTRATION.JWT || !methodRegistration) {
            await this.regenereteCodeByEmail({ email, sendMethod: enum_1.METHOD_FORGET_PASSWORD.EMAIL });
            isCheckedEmail = false;
        }
        const user = await this.userModel.create({
            email,
            password: hashPassword,
            methodRegistration,
            fullName,
            codeCheck,
            isCheckedEmail,
        });
        const { role, id } = user;
        const tokens = this.jwtTokenService.generateTokens({ email, role, id });
        await this.jwtTokenService.saveToken(id, tokens.refreshToken);
        const userObject = user.toObject();
        delete userObject.password;
        delete userObject.codeCheck;
        return Object.assign(Object.assign({}, tokens), { user: userObject });
    }
    async login({ email, password, methodRegistration = enum_1.METHOD_REGISTRATION.JWT }) {
        const user = await this.userModel.findOne({ email }).select('-isValidationUser');
        if (!user) {
            throw new common_1.HttpException(`User ${email} not found`, common_1.HttpStatus.BAD_REQUEST);
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals && methodRegistration === enum_1.METHOD_REGISTRATION.JWT) {
            throw new common_1.HttpException(`Bad password`, common_1.HttpStatus.BAD_REQUEST);
        }
        const { role, id, isCheckedEmail } = user;
        if (!isCheckedEmail) {
            await this.regenereteCodeByEmail({ email, sendMethod: enum_1.METHOD_FORGET_PASSWORD.EMAIL });
        }
        const tokens = this.jwtTokenService.generateTokens({ email, role, id });
        const userObject = user.toObject();
        delete userObject.codeCheck;
        delete userObject.password;
        await this.jwtTokenService.saveToken(id, tokens.refreshToken);
        return Object.assign(Object.assign({}, tokens), { user: userObject });
    }
    async logout(refreshToken) {
        const token = await this.jwtTokenService.removeToken(refreshToken);
        return token;
    }
    async refresh(refreshToken) {
        if (!refreshToken) {
            throw new common_1.HttpException(`UNAUTHORIZED`, common_1.HttpStatus.UNAUTHORIZED);
        }
        const userData = this.jwtTokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await this.jwtTokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw new common_1.HttpException(`UNAUTHORIZED`, common_1.HttpStatus.UNAUTHORIZED);
        }
        const user = await this.userModel.findById(userData.id).select('-isValidationUser -password -codeCheckEmail');
        const { role, id, email } = user;
        const tokens = this.jwtTokenService.generateTokens({ email, role, id });
        await this.jwtTokenService.saveToken(id, tokens.refreshToken);
        return Object.assign(Object.assign({}, tokens), { user });
    }
    async regenereteCodeByEmail({ email, sendMethod }) {
        const user = await this.userModel.findOne({ email });
        const codeCheck = (0, utils_1.generateRandomFourDigitCode)();
        await user.updateOne({ codeCheck });
        if (sendMethod === enum_1.METHOD_FORGET_PASSWORD.PHONE) {
            this.sendCodePhoneMessage({ phone: user.phone, codeCheck });
            return;
        }
        this.sendCodeEmailMessage({ email, codeCheck });
        return;
    }
    async sendCodeEmailMessage({ email, codeCheck }) {
        await this.mailService.sendMail({
            to: email,
            subject: 'Your verification code to Neigharbor',
            text: `Your code ${codeCheck}, please input code in field`
        });
    }
    async sendCodePhoneMessage({ phone, codeCheck }) {
        await this.smsService.sendSms({ phone, body: `Your code ${codeCheck}, please input code in field` });
    }
    async confirmAccount({ email, code }) {
        try {
            const user = await this.userModel.findOne({ email });
            if (user.codeCheck !== code) {
                throw new common_1.HttpException(`Bad code`, common_1.HttpStatus.BAD_REQUEST);
            }
            await user.updateOne({
                isCheckedEmail: true
            });
            return {
                isCheckedEmail: true
            };
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getPhoneNumber(body) {
        try {
            const user = await this.userModel.findOne({ email: body.email });
            if (!user) {
                throw new common_1.HttpException(`Bad Email`, common_1.HttpStatus.BAD_REQUEST);
            }
            return { email: user.email, phone: user.phone };
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async forgetPassword({ email, code }) {
        try {
            const user = await this.userModel.findOne({ email });
            if (user.codeCheck !== code) {
                throw new common_1.HttpException(`Bad code`, common_1.HttpStatus.BAD_REQUEST);
            }
            return { hashPassword: user.password };
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async changePassword({ email, oldPassword, hashPassword, newPassword }) {
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new common_1.HttpException(`User not found`, common_1.HttpStatus.BAD_REQUEST);
        }
        const password = await bcrypt.hash(newPassword, 3);
        if (hashPassword && hashPassword === user.password) {
            await user.updateOne({ password });
            return;
        }
        const isPassEquals = await bcrypt.compare(oldPassword, user.password);
        if (!isPassEquals) {
            throw new common_1.HttpException('Bad password', common_1.HttpStatus.BAD_REQUEST);
        }
        await user.updateOne({ password });
        return;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_auth_service_1.JwtTokenService,
        mail_service_1.MailService,
        sms_service_1.SmsService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map