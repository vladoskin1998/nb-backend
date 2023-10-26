import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/user.schema';
import { Model } from 'mongoose';
import { AuthDto, RegistrationDto } from './auth.dto';
import { HTTP_MESSAGE, ROLES, METHOD_REGISTRATION } from 'src/enum/enum';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mailer/mail.service';
import { JwtTokenService } from './jwt-auth.service';
import { v4 as uuidv4 } from 'uuid';
import { generateRandomFourDigitCode } from 'src/utils/utils';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtTokenService: JwtTokenService,
        private mailService: MailService,
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
                fullName: 'Neighbor'
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

    async registration({ email, password, methodRegistration, fullName }: RegistrationDto) {

        const candidate = await this.userModel.findOne({ email }).select('-isValidationUser -password');

        if (candidate) {
            throw new HttpException(
                `User ${email} already created`,
                HttpStatus.BAD_REQUEST,
            );
        }

        const hashPassword = await bcrypt.hash(password, 3);
        const codeCheck = generateRandomFourDigitCode()

        const user = await this.userModel.create({
            email,
            password: hashPassword,
            methodRegistration,
            fullName,
            codeCheck,
        })

        if ( methodRegistration === METHOD_REGISTRATION.JWT || !methodRegistration  ) {
            await this.regenereteCodeByEmail({email})
        }

        const { role, id } = user;

        const tokens = this.jwtTokenService.generateTokens({ email, role, id });
        await this.jwtTokenService.saveToken(id, tokens.refreshToken);

        const userObject = user.toObject();

        delete userObject.password
        delete userObject.codeCheck

     

        return { ...tokens, user: userObject };
    }

    async login({ email, password, methodRegistration = METHOD_REGISTRATION.JWT }: AuthDto) {
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
        const { role, id, isCheckedEmail } = user;

        if(!isCheckedEmail){
           await this.regenereteCodeByEmail({email})
        }

        const tokens = this.jwtTokenService.generateTokens({ email, role, id });

        const userObject = user.toObject();

        delete userObject.codeCheck
        delete userObject.password

        await this.jwtTokenService.saveToken(id, tokens.refreshToken);

        return { ...tokens, user: userObject };
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
        const user = await this.userModel.findById(userData.id).select('-isValidationUser -password -codeCheckEmail');
        const { role, id, email } = user;
        const tokens = this.jwtTokenService.generateTokens({ email, role, id });

        await this.jwtTokenService.saveToken(id, tokens.refreshToken);
        return { ...tokens, user };
    }

    async regenereteCodeByEmail({email}:{email:string}){
        const user = await this.userModel.findOne({ email })
        const codeCheck = generateRandomFourDigitCode()
        await user.updateOne({codeCheck})
        await this.mailService.sendMail({  
            to: user.email,
            subject: '',
            text: `Your confirm code ${codeCheck}, please input code in field`
            }
        ) 
        return 
    }

    async confirmCodeByEmail({ email, code }) {
        const user = await this.userModel.findOne({ email })

        if (user.codeCheck !== code) {
            throw new HttpException(`Bad code`, HttpStatus.BAD_REQUEST);
        }

        await user.updateOne({
            isCheckedEmail: true
        })

        return {
            isCheckedEmail: true
        }
    }
}
