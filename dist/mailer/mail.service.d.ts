export declare class MailService {
    private oauth2Client;
    private transporter;
    constructor();
    sendMail({ to, subject, text, }: {
        to: string;
        subject: string;
        text: string;
    }): Promise<unknown>;
}
