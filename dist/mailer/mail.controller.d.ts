import { MailService } from './mail.service';
export declare class MailController {
    private readonly mailService;
    constructor(mailService: MailService);
    send(): Promise<void>;
}
