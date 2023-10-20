import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { FilesModule } from 'src/files/files.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { PublishPosts, PublishPostsSchema } from './publish-posts.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
        { name: PublishPosts.name, schema: PublishPostsSchema },
    ]),
    MulterModule.register({}),
    FilesModule,
],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
