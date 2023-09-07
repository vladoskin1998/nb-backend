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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacebookStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_facebook_1 = require("passport-facebook");
const enum_1 = require("../enum/enum");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
console.log(process.env.APP_PORT);
console.log(process.env.MONGO_LINK);
console.log(process.env.JWT_SECRET);
console.log(process.env.MAIL_TRANSPORT);
console.log(process.env.MAIL_FROM);
console.log(process.env.GOOGLE_CLIENT_ID);
console.log(process.env.GOOGLE_CLIENT_SECRET);
console.log(process.env.FB_ID);
console.log(process.env.FB_SECRET);
let FacebookStrategy = class FacebookStrategy extends (0, passport_1.PassportStrategy)(passport_facebook_1.Strategy, 'facebook') {
    constructor() {
        super({
            clientID: process.env.FB_ID,
            clientSecret: process.env.FB_SECRET,
            callbackURL: 'https://nb-nb.onrender.com/api/auth/facebook-redirect',
            scope: ['email', 'public_profile'],
            profileFields: ['id', 'emails', 'name'],
        });
    }
    async validate(_accessToken, _refreshToken, profile, done) {
        const { emails } = profile;
        const user = {
            email: emails[0].value,
            methodRegistration: enum_1.METHOD_REGISTRATION.FACEBOOK,
        };
        done(null, user);
    }
};
FacebookStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], FacebookStrategy);
exports.FacebookStrategy = FacebookStrategy;
//# sourceMappingURL=fb-auth.service.js.map