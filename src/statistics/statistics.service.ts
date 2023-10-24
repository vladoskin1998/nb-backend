import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Activities } from 'src/activities/activities.schema';
import { Category } from 'src/category/category.schema';
import { Message } from 'src/messenger/message.schema';
import { UserIdentity } from 'src/user-identity/user-identity.schema';
import { User } from 'src/user/user.schema';
import { Statistic } from './statistic.schema';

@Injectable()
export class StatisticsService {

    constructor(
        @InjectModel(Activities.name) private activitiesModel: Model<Activities>,
        @InjectModel(Category.name) private categoryModel: Model<Category>,
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(Message.name) private messageModel: Model<Message>,
        @InjectModel(UserIdentity.name) private userIdentityModel: Model<UserIdentity>,
        @InjectModel(Statistic.name) private statisticModel: Model<Statistic>,
    ) { }

    async countDocumentsDb() {
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

    async countUser() {
   
        const yesterday = new Date();
        yesterday.setUTCHours(0, 0, 0, 0);
        yesterday.setDate(yesterday.getDate() - 1);

        const totalUsers = await this.userModel.countDocuments()

        const activeUsers = await this.userIdentityModel
            .countDocuments({
                createdUserDate: { $gte: yesterday},
                isGotAllProfileInfo: true,
            })
            .exec();

        const nonActiveUsers = await this.userIdentityModel
            .countDocuments({
                createdUserDate: { $gte: yesterday },
                isGotAllProfileInfo: false,
            })
            .exec();

        const newUsers = activeUsers + nonActiveUsers

        return {
            totalUsers,
            newUsers,
            activeUsers,
            nonActiveUsers,
        }
    }

    async getDocumentUsersNumber({limit=10}:{limit?:number}){
        return (await this.statisticModel.find().sort({ createdStatisticDate: -1 }).limit(limit)).reverse()
    }

    async saveStatistic(){
        const getStatisticOneDay = await this.countUser()
        await this.statisticModel.create(getStatisticOneDay)
    }
}


