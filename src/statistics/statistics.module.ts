import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Activities, ActivitiesSchema } from 'src/activities/activities.schema';
import { Category, CategorySchema } from 'src/category/category.schema';
import { Message, MessageSchema } from 'src/messenger/message.schema';
import { User, UserSchema } from 'src/user/user.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: Activities.name, schema: ActivitiesSchema },
      { name: Message.name, schema: MessageSchema },
      { name: User.name, schema: UserSchema },
      { name: Category.name, schema: CategorySchema },
  ]),
  ],
  controllers: [StatisticsController],
  providers: [StatisticsService]
})
export class StatisticsModule {}
