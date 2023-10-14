import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type StatisticDocument = HydratedDocument<Statistic>;

@Schema()
export class Statistic {
    @Prop({ default: 0 })
    totalUsers: number;

    @Prop({ default: 0 })
    newUsers: number;

    @Prop({ default: 0 })
    activeUsers: number;

    @Prop({ default: 0 })
    nonActiveUsers: number;

    @Prop({ default: new Date() })
    createdStatisticDate: Date;

}

export const StatisticSchema = SchemaFactory.createForClass(Statistic);