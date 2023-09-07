import { MailerService } from '@nestjs-modules/mailer';
import { MailDto } from './mail.dto';
export declare class MailService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    send(dto: MailDto): Promise<void>;
}
