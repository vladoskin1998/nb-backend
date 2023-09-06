import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-facebook";
import { METHOD_REGISTRATION } from "src/enum/enum";

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: "312946244557381",
      clientSecret: "37af49993b1556646cb4fe79aab6fc2c",
      callbackURL: 'http://localhost:5000/api/auth/facebook-redirect',
      scope: ["email", "public_profile" ],
       profileFields: ['id', 'emails', 'name'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void
  ): Promise<any> {    
    const { emails } = profile;
    const user = {
      email: emails[0].value,
      methodRegistration: METHOD_REGISTRATION.FACEBOOK,
    };
    done(null, user);
  }
}