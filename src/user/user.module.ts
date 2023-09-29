import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { AuthModule } from '../auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { FilesModule } from 'src/files/files.module';
import { UserIdentityModule } from 'src/user-identity/user-identity.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
        ]),
        MulterModule.register({}),
        AuthModule,
        FilesModule,
        UserIdentityModule,
    ],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule { }
