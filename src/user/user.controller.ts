import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUserByRoleDto, IDUserDto, LocationDto } from './user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }


    @Post('location')
    async logout(@Body() body: LocationDto) {
        console.log(body);

        return await this.userService.changeLocation(body)
    }

    @Post('get-users')
    async getUsersByRole(@Body() body: GetUserByRoleDto) {
        console.log(body);

        return await this.userService.getUsersByRole(body.role)
    }


    @Post('delete-user')
    async deleteUser(@Body() body: IDUserDto) {
        console.log(body);

        return await this.userService.deleteUser(body._id)
    }

    @Post('block-user')
    async blockUser(@Body() body: IDUserDto) {
        console.log(body);

        return await this.userService.blockUser(body._id)
    }
}
