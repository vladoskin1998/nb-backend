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
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const googleapis_1 = require("googleapis");
const nodemailer = require("nodemailer");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
console.log("GOOGLE_CLIENT_ID_MAIL", process.env.GOOGLE_CLIENT_ID_MAIL);
console.log("GOOGLE_CLIENT_SECRET_MAIL", process.env.GOOGLE_CLIENT_SECRET_MAIL);
console.log("GOOGLE_CLIENT_SECRET_MAIL", process.env.GOOGLE_REFRESH_REDIRECT_MAIL_URL);
let MailService = class MailService {
    constructor() {
        this.oauth2Client = new googleapis_1.google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID_MAIL, process.env.GOOGLE_CLIENT_SECRET_MAIL, process.env.GOOGLE_REFRESH_REDIRECT_MAIL_URL);
        this.oauth2Client.setCredentials({
            refresh_token: process.env.GOOGLE_REFRESH_TOKEN_MAIL,
        });
        this.transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.GMAIL_ADDRESS,
                clientId: process.env.GOOGLE_CLIENT_ID_MAIL,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET_MAIL,
                refreshToken: process.env.GOOGLE_REFRESH_TOKEN_MAIL,
                accessToken: this.oauth2Client.getAccessToken(),
            },
        });
    }
    async sendMail({ to, subject, text, }) {
        console.log("sendMail");
        const mailOptions = {
            from: 'neighborharbor@gmail.com',
            to,
            subject,
            text,
        };
        return new Promise((resolve, reject) => {
            this.transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    reject(error);
                }
                else {
                    console.log(info);
                    resolve(info.response);
                }
            });
        });
    }
};
MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mail.service.js.map