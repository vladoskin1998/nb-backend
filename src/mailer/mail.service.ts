import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { MailDto } from './mail.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async send(dto: MailDto): Promise<void> {

    const {to,text,html } = dto
    console.log("vladosik4891");
    
    await this.mailerService
      .sendMail({
        to: 'vladosik4891@gmail.com', // list of receivers
        from: 'vladosik4891@gmail.com', // sender address
        subject: 'Testing Nest MailerModule ✔', // Subject line
        text: 'hello', 
        html: '<h1>hello<h1>',  
      })
      .then(() => { console.log('send');
      })
      .catch((e) => {
        console.log(e, 'send error');
        
      });
  }
}
