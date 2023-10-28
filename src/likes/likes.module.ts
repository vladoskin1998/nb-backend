import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Likes, LikesSchema } from './likes.schema';

@Module({
  imports:
    [
      MongooseModule.forFeature([
        { name: Likes.name, schema: LikesSchema },
      ]),
    ],
  controllers: [LikesController],
  providers: [LikesService]
})
export class LikesModule { }
