import { Injectable } from '@nestjs/common';

import { StatisticsService } from './statistics.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class ScheduledTasksService {

    constructor(
        private statisticsService: StatisticsService
    ) { }

    @Cron('0 0 * * *')
    async scheduleStatistics() {
        console.log("scheduleStatistics");

        await this.statisticsService.saveStatistic()
    }
}