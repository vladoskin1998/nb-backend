import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { AuthModule } from '../auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { UserIdentity, UserIdentitySchema } from 'src/user-identity/user-identity.schema';
import { Friends, FriendsSchema } from './friends.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: UserIdentity.name, schema: UserIdentitySchema },
            { name: Friends.name, schema: FriendsSchema },
            
        ]),
        MulterModule.register({}),
        AuthModule,
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule { }
