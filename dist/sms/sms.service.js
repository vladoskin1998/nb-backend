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
exports.SmsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const twilio_1 = require("twilio");
let SmsService = class SmsService {
    constructor(configService) {
        this.configService = configService;
        const accountSid = configService.get('TWILIO_ACCOUNT_SID');
        const authToken = configService.get('TWILIO_AUTH_TOKEN');
        this.twilioClient = new twilio_1.Twilio(accountSid, authToken);
    }
    async sendSms({ body, phone }) {
        let to = phone;
        if (!/^\+[1-9]\d{1,14}$/.test(phone)) {
            to = `+1${phone.replace(/\D/g, '')}`;
        }
        console.log(phone);
        await this.twilioClient.messages
            .create({
            body,
            from: '+14406932111',
            to: phone
        });
    }
};
SmsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SmsService);
exports.SmsService = SmsService;
//# sourceMappingURL=sms.service.js.map