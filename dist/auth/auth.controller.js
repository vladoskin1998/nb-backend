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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("./auth.service");
const google_auth_guard_1 = require("./google-auth.guard");
const auth_dto_1 = require("./auth.dto");
const config_1 = require("@nestjs/config");
let AuthController = class AuthController {
    constructor(authService, configService) {
        this.authService = authService;
        this.configService = configService;
    }
    async googleAuth() { }
    async googleAuthRedirect(req, res) {
        const payload = await this.authService.messengerLogin(req.user);
        res.cookie('refreshToken', payload.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        return res.redirect(this.configService.get('CALL_BACK_URL_WEB_APP'));
    }
    async facebookLogin() { }
    async facebookLoginRedirect(req, res) {
        const payload = await this.authService.messengerLogin(req.user);
        res.cookie('refreshToken', payload.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        return res.redirect(this.configService.get('CALL_BACK_URL_WEB_APP'));
    }
    async registration(authDto, res) {
        const result = await this.authService.registration(authDto);
        res.cookie('refreshToken', result.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        return result;
    }
    async login(authDto, res) {
        const result = await this.authService.login(authDto);
        res.cookie('refreshToken', result.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        return result;
    }
    async refresh(req, res) {
        const { refreshToken } = req === null || req === void 0 ? void 0 : req.cookies;
        const result = await this.authService.refresh(refreshToken);
        res.cookie('refreshToken', result.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        return result;
    }
    async logout(req, res) {
        const { refreshToken } = req.cookies;
        await this.authService.logout(refreshToken);
        res.clearCookie('refreshToken');
        return 'LOGOUT';
    }
    async regenereteCodeByEmail(body) {
        return await this.authService.regenereteCodeByEmail(body);
    }
    async confirmAccount(body) {
        return await this.authService.confirmAccount(body);
    }
    async getPhoneNumber(body) {
        return await this.authService.getPhoneNumber(body);
    }
    async forgetPassword(body) {
        return await this.authService.forgetPassword(body);
    }
    async changePassword(body) {
        return await this.authService.changePassword(body);
    }
};
__decorate([
    (0, common_1.Get)('google'),
    (0, common_1.UseGuards)(google_auth_guard_1.GoogleOAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuth", null);
__decorate([
    (0, common_1.Get)('google-redirect'),
    (0, common_1.UseGuards)(google_auth_guard_1.GoogleOAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuthRedirect", null);
__decorate([
    (0, common_1.Get)('facebook'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('facebook')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "facebookLogin", null);
__decorate([
    (0, common_1.Get)('facebook-redirect'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('facebook')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "facebookLoginRedirect", null);
__decorate([
    (0, common_1.Post)('registration'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.RegistrationDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registration", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('refresh'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('regenerete-code-email'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.RegenerateCodeEmailDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "regenereteCodeByEmail", null);
__decorate([
    (0, common_1.Post)('confirm-account'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.ConfirmCodeEmailDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "confirmAccount", null);
__decorate([
    (0, common_1.Post)('get-phone-number'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.EmailDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getPhoneNumber", null);
__decorate([
    (0, common_1.Post)('forget-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.ConfirmCodeEmailDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgetPassword", null);
__decorate([
    (0, common_1.Post)('change-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.ChangePAsswordDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        config_1.ConfigService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map