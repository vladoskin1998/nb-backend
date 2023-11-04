import { ConfigService } from '@nestjs/config';
export declare class SmsService {
    readonly configService: ConfigService;
    private twilioClient;
    constructor(configService: ConfigService);
    sendSms({ body, phone }: {
        body: string;
        phone: string;
    }): Promise<void>;
}
