import { StatisticsService } from './statistics.service';
export declare class ScheduledTasksService {
    private statisticsService;
    constructor(statisticsService: StatisticsService);
    scheduleStatistics(): Promise<void>;
}
