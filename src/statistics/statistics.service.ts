import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Activities } from 'src/activities/activities.schema';
import { Category } from 'src/category/category.schema';
import { Message } from 'src/messenger/message.schema';
import { User } from 'src/user/user.schema';

@Injectable()
export class StatisticsService {

    constructor(
        @InjectModel(Activities.name) private activitiesModel: Model<Activities>,
        @InjectModel(Category.name) private categoryModel: Model<Category>,
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(Message.name) private messageModel: Model<Message>,

    ) { }

    async countDocumentsDb(){
        try {
            const countServices = await this.categoryModel.countDocuments()
            const countActivities = await this.activitiesModel.countDocuments()
            const countUsers = await this.userModel.countDocuments()
            const countMessages = await this.messageModel.countDocuments()
            return {
                countServices,
                countActivities,
                countUsers,
                countMessages

            }
        } catch (error) {
            
        }
    }
}
