import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';
@Injectable()
export class SmsService {

    private twilioClient: Twilio;

    constructor(
        readonly configService: ConfigService
    ) {
        const accountSid = configService.get('TWILIO_ACCOUNT_SID');
        const authToken = configService.get('TWILIO_AUTH_TOKEN');

        this.twilioClient = new Twilio(accountSid, authToken);
    }

    async sendSms({body, phone}: {body: string, phone:string}) {
        let to = phone

      
        
        if(!/^\+[1-9]\d{1,14}$/.test(phone)){
            to = `+1${phone.replace(/\D/g, '')}`;
        }
   
        await this.twilioClient.messages
        .create({
            body,
            from: '+14406932111',
            to: phone
        })     
    }
}
