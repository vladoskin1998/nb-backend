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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: path.join(__dirname,'.env')}),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'build')
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get('MONGO_LINK');
        console.log(uri);
        
        return {
          uri,
          dbName: 'jfit'
        };
      },
    }),
    AuthModule,
    FilesModule,
    UserModule,
    CategoryModule,
    ActivitiesModule,
  ],
})
export class AppModule {}
