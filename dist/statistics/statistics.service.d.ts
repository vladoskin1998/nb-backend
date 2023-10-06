import { Model } from 'mongoose';
import { Activities } from 'src/activities/activities.schema';
import { Category } from 'src/category/category.schema';
import { Message } from 'src/messenger/message.schema';
import { User } from 'src/user/user.schema';
export declare class StatisticsService {
    private activitiesModel;
    private categoryModel;
    private userModel;
    private messageModel;
    constructor(activitiesModel: Model<Activities>, categoryModel: Model<Category>, userModel: Model<User>, messageModel: Model<Message>);
    countDocumentsDb(): Promise<{
        countServices: number;
        countActivities: number;
        countUsers: number;
        countMessages: number;
    }>;
}
