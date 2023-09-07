import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';
import { METHOD_REGISTRATION } from 'src/enum/enum';
import { config } from 'dotenv';
config();

console.log(process.env.APP_PORT);
console.log(process.env.MONGO_LINK);

console.log(process.env.JWT_SECRET);
console.log(process.env.MAIL_TRANSPORT);
console.log(process.env.MAIL_FROM);

console.log(process.env.GOOGLE_CLIENT_ID);
console.log(process.env.GOOGLE_CLIENT_SECRET);
console.log(process.env.FB_ID);
console.log(process.env.FB_SECRET);

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      // callbackURL: 'http://localhost:5000/api/auth/facebook-redirect',
      callbackURL: 'https://nb-nb.onrender.com/api/auth/facebook-redirect',
      scope: ['email', 'public_profile'],
      profileFields: ['id', 'emails', 'name'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    const { emails } = profile;
    const user = {
      email: emails[0].value,
      methodRegistration: METHOD_REGISTRATION.FACEBOOK,
    };
    done(null, user);
  }
}
