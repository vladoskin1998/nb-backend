import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import * as nodemailer from 'nodemailer';
import { config } from 'dotenv';

config();

console.log("GOOGLE_CLIENT_ID_MAIL",process.env.GOOGLE_CLIENT_ID_MAIL);
console.log("GOOGLE_CLIENT_SECRET_MAIL",process.env.GOOGLE_CLIENT_SECRET_MAIL);
console.log("GOOGLE_CLIENT_SECRET_MAIL",process.env.GOOGLE_REFRESH_REDIRECT_MAIL_URL);

@Injectable()
export class MailService {
    private oauth2Client: any;
    private transporter: any;

    constructor() {
        this.oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID_MAIL,
            process.env.GOOGLE_CLIENT_SECRET_MAIL,
            process.env.GOOGLE_REFRESH_REDIRECT_MAIL_URL
        );
        this.oauth2Client.setCredentials({
            refresh_token: process.env.GOOGLE_REFRESH_TOKEN_MAIL
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

    async sendMail({
        to,
        subject,
        text,
    }: {
        to: string;
        subject: string;
        text: string;
      } ) {
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
                } else {
                    console.log(info);
                    
                    resolve(info.response);
                }
            });
        });
    }
}