import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { FilesModule } from 'src/files/files.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { PublishPosts, PublishPostsSchema } from './publish-posts.schema';
import { Likes, LikesSchema } from 'src/likes/likes.schema';
import { PublishComments, PublishCommentsSchema } from './publish-comments.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
        { name: PublishPosts.name, schema: PublishPostsSchema },
        { name: PublishComments.name, schema: PublishCommentsSchema },
        { name: Likes.name, schema: LikesSchema },
    ]),
    MulterModule.register({}),
    FilesModule,
],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
