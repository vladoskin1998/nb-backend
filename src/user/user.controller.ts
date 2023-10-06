import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ChangePasswordDTO, GetUsers, IDUserDto, UserTextInfoDTO } from './user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }


    // @Post('profile-location')
    // async logout(@Body() body: LocationDto) {
    //     return await this.userService.changeLocation(body)
    // }

    @Post('get-users')
    async getUsersByRole(@Body() body: GetUsers) {
        return await this.userService.getUsers(body)
    }


    @Post('delete-user')
    async deleteUser(@Body() body: IDUserDto) {
        return await this.userService.deleteUser(body._id)
    }

    @Post('block-user')
    async blockUser(@Body() body: IDUserDto) {
        console.log(body);

        return await this.userService.blockUser(body._id)
    }

    @Post('user-text-info')
    async userTextInfo(
        @Body() body: UserTextInfoDTO
    ){
        return await this.userService.userTextInfo(body)
    }


    @Post('user-change-password')
    async userChangePassword(
        @Body() body: ChangePasswordDTO
    ){
        return await this.userService.userChangePassword(body)
    }

}
