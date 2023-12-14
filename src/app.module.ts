import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { MulterModule } from '@nestjs/platform-express';
import { ERROR_MESSAGE } from './enum/enum';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ActivitiesModule } from './activities/activities.module';
import { UserIdentityModule } from './user-identity/user-identity.module';
import { MessengerModule } from './messenger/messenger.module';
import { StatisticsModule } from './statistics/statistics.module';
import { PostsModule } from './posts/posts.module';
import { MailModule } from './mailer/mail.module';
import { LikesModule } from './likes/likes.module';
import { SmsModule } from './sms/sms.module';
import { NotificationModule } from './notification/notification.module';
// import { MapModule } from 'map/map.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: path.join(__dirname,'.env')}),
    ServeStaticModule.forRoot({
      serveRoot: "/uploads",
      rootPath: path.join(__dirname, '..', 'uploads'), 
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'build')
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get('MONGO_LINK');
        const appEnv = configService.get('APP_ENV');
        console.log(uri);
        
        return {
          uri,
          dbName: appEnv === 'DEV' ? 'jfit' :'nb_hb'
        };
      },
    }),
    AuthModule,
    FilesModule,
    UserModule,
    CategoryModule,
    ActivitiesModule,
    UserIdentityModule,
    MessengerModule,
    StatisticsModule,
    PostsModule,
    MailModule,
    LikesModule,
    SmsModule,
    NotificationModule,
    // MapModule,
  ],
})
export class AppModule {}
