import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';
import { METHOD_REGISTRATION } from 'src/enum/enum';
import { config } from 'dotenv';
import path from 'path';

const env =  path?.join(__dirname, '.env')
console.log("FacebookStrategy-------->", env);

config({
  path: env
});

console.log(process.env.FB_ID);
console.log(process.env.FB_SECRET);
console.log(process.env.CALL_BACK_URL_FB);

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      //callbackURL: 'http://localhost:5000/api/auth/facebook-redirect',
      // callbackURL: 'https://nb-nb.onrender.com/api/auth/facebook-redirect',
      callbackURL: process.env.CALL_BACK_URL_FB,
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
