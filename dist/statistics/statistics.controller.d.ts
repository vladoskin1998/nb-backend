import { StatisticsService } from './statistics.service';
export declare class StatisticsController {
    private readonly statisticsService;
    constructor(statisticsService: StatisticsService);
    countDocumentsDb(): Promise<{
        countServices: number;
        countActivities: number;
        countUsers: number;
        countMessages: number;
    }>;
}
