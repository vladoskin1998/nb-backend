import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { FilesModule } from 'src/files/files.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { PublishPosts, PublishPostsSchema } from './publish-posts.schema';
import { Likes, LikesSchema } from 'src/likes/likes.schema';
import { PublishComments, PublishCommentsSchema } from './publish-comments.schema';
import { UserIdentity, UserIdentitySchema } from 'src/user-identity/user-identity.schema';
import { NotificationModule } from 'src/notification/notification.module';
import { Repost, RepostSchema } from './repost.schema';
import { MarkPost, MarkPostSchema } from './posts-mark.schema';
import { PostNotification, PostNotificationSchema } from './post-notification.schema';
import { User, UserSchema } from 'src/user/user.schema';
import { PostPin, PostPinSchema } from './post-pin.schema';
import { PostHide, PostHideSchema } from './post-hide.schema';


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: PublishPosts.name, schema: PublishPostsSchema },
            { name: PublishComments.name, schema: PublishCommentsSchema },
            { name: Likes.name, schema: LikesSchema },
            { name: Repost.name, schema: RepostSchema },
            { name: MarkPost.name, schema: MarkPostSchema },
            { name: User.name, schema: UserSchema }, ,
            { name: PostNotification.name, schema: PostNotificationSchema },
            { name: PostPin.name, schema: PostPinSchema },
            { name: PostHide.name, schema: PostHideSchema },
        ]),
        MulterModule.register({}),
        FilesModule,
        NotificationModule,
    ],
    controllers: [PostsController],
    providers: [PostsService]
})
export class PostsModule { }
