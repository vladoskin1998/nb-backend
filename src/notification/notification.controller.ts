import { Body, Controller, Post } from "@nestjs/common";
import { UserIdDTO } from "./notification.dto";
import { NotificationService } from "./notification.service";

@Controller('notification')
export class NotificationController {

    constructor(
        private notificationService: NotificationService
    ){}

    @Post('get-notification')
    async getNotification(@Body() body: UserIdDTO) {
        return await this.notificationService.getUserNotification(body)
    }
}