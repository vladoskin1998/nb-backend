import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Authentication, AuthenticationSchema } from './auth.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
//import { MailModule } from 'src/mailer/mail.module';
import { GoogleStrategy } from './google-auth.service';
import { FacebookStrategy } from './fb-auth.service';
import { JwtTokenService } from './jwt-auth.service';
import { User, UserSchema } from '../user/user.schema';

@Module({
    imports: [
        ConfigModule,
        MongooseModule.forFeature([
            { name: Authentication.name, schema: AuthenticationSchema },
            { name: User.name, schema: UserSchema },
        ]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const secret = configService.get('JWT_SECRET');
                return {
                    secret,
                };
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService,
        GoogleStrategy,
        FacebookStrategy,
        JwtTokenService],
    exports: [
        JwtTokenService
    ]
})
export class AuthModule { }
