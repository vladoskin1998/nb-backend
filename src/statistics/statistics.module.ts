import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Activities, ActivitiesSchema } from 'src/activities/activities.schema';
import { Category, CategorySchema } from 'src/category/category.schema';
import { Message, MessageSchema } from 'src/messenger/message.schema';
import { User, UserSchema } from 'src/user/user.schema';
import { UserIdentity, UserIdentitySchema } from 'src/user-identity/user-identity.schema';
import { Statistic, StatisticSchema } from './statistic.schema';
import { ScheduleModule } from '@nestjs/schedule';
import { ScheduledTasksService } from './statistic.scheduler';

@Module({
  imports:[
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([
      { name: Activities.name, schema: ActivitiesSchema },
      { name: Message.name, schema: MessageSchema },
      { name: User.name, schema: UserSchema },
      { name: Category.name, schema: CategorySchema },
      { name: UserIdentity.name, schema: UserIdentitySchema },
      {name: Statistic.name, schema: StatisticSchema}
  ]),
  ],
  controllers: [StatisticsController],
  providers: [StatisticsService, ScheduledTasksService]
})
export class StatisticsModule {}
