import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/user.schema';
import { Model } from 'mongoose';
import { AuthDto } from './auth.dto';
import { HTTP_MESSAGE, ROLES, METHOD_REGISTRATION } from 'src/enum/enum';
import * as bcrypt from 'bcrypt';
//import { MailService } from 'src/mailer/mail.service';
import { JwtTokenService } from './jwt-auth.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtTokenService: JwtTokenService,
        //   private mailService: MailService,
    ) { }

    async messengerLogin(user: { email: string, methodRegistration: METHOD_REGISTRATION }) {
        const { email, methodRegistration } = user;

        console.log(email, methodRegistration);

        if (!user) {
            throw new HttpException(`No user from ${methodRegistration}`, HttpStatus.BAD_REQUEST);
        }

        const candidate = await this.userModel.findOne({ email });

        if (!candidate) {
            const uuidPwd = uuidv4()
            const password = await bcrypt.hash(uuidPwd, 3);
            return await this.registration({
                email,
                password,
                methodRegistration,
            });
        }

        // if (candidate.methodRegistration !== methodRegistration) {
        //   throw new HttpException(
        //     `Bad method auth, your method ${candidate.methodRegistration}`,
        //     HttpStatus.FORBIDDEN,
        //   );
        // }
        return await this.login({ email, password: candidate?.password, methodRegistration });
    }

    // async fbLogin(req) {
    //     if (!req.user) {
    //         return 'No user from google';
    //     }

    //     return {
    //         message: 'User information from google',
    //         user: req.user,
    //     };
    // }

    async registration({ email, password, methodRegistration }: AuthDto) {

        const candidate = await this.userModel.findOne({ email }).select('-isValidationUser -password');

        if (candidate) {
            throw new HttpException(
                `User ${email} already created`,
                HttpStatus.BAD_REQUEST,
            );
        }

        const hashPassword = await bcrypt.hash(password, 3);

        const user = await this.userModel.create({
            email,
            password: hashPassword,
            methodRegistration,
        });

        const { role, id } = user;

        const tokens = this.jwtTokenService.generateTokens({ email, role, id });
        await this.jwtTokenService.saveToken(id, tokens.refreshToken);

        return { ...tokens, user};
    }

    async login({ email, password, methodRegistration }: AuthDto) {
        const user = await this.userModel.findOne({ email }).select('-isValidationUser');
        if (!user) {
            throw new HttpException(
                `User ${email} not found`,
                HttpStatus.BAD_REQUEST,
            );
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals && methodRegistration === METHOD_REGISTRATION.JWT) {
            throw new HttpException(`Bad password`, HttpStatus.BAD_REQUEST);
        }
        const { role, id} = user;
        const tokens = this.jwtTokenService.generateTokens({ email, role, id });

        delete user.password
        await this.jwtTokenService.saveToken(id, tokens.refreshToken);
        return { ...tokens, user };
    }

    async logout(refreshToken: string) {
        const token = await this.jwtTokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw new HttpException(`UNAUTHORIZED`, HttpStatus.UNAUTHORIZED);
        }
        const userData = this.jwtTokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await this.jwtTokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw new HttpException(`UNAUTHORIZED`, HttpStatus.UNAUTHORIZED);
        }
        const user = await this.userModel.findById(userData.id).select('-isValidationUser -password');
        const { role, id, email } = user;
        const tokens = this.jwtTokenService.generateTokens({ email, role, id });

        await this.jwtTokenService.saveToken(id, tokens.refreshToken);
        return { ...tokens, user };
    }
}
