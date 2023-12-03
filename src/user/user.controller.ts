import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { AddFriendDto, ClosestUserDto, GetUsers, IDUserDto, UserTextInfoDTO } from './user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserIdDTO } from 'src/notification/notification.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('get-user')
    async getUserById(@Body() body: UserIdDTO) {
        return await this.userService.getOneUserById(body)
    }


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
     

        return await this.userService.blockUser(body._id)
    }

    @Post('user-text-info')
    async userTextInfo(
        @Body() body: UserTextInfoDTO
    ) {
        return await this.userService.userTextInfo(body)
    }


    @Post('get-closest-user')
    async getClosestUserByRole(
        @Body() body: ClosestUserDto
    ) {
        return await this.userService.getClosestUserByRole(body)
    }


    @Post('get-friends')
    async getMyFriends(
        @Body() body: IDUserDto
    ) {
        return await this.userService.getMyFriends(body)
    }
    
    @Post('check-my-friend')
    async checkToMyFriend(
        @Body() body: AddFriendDto
    ) {
        return await this.userService.checkToMyFriend(body)
    }
    
    @Post('add-my-friend')
    async addToMyFriend(
        @Body() body: AddFriendDto
    ) {
        return await this.userService.addToMyFriend(body)
    }

    @Post('delete-to-friend')
    async deleteMyFriend(
        @Body() body: AddFriendDto
    ) {
        return await this.userService.deleteMyFriend(body)
    }

    @Post('upload-avatar')
    @UseInterceptors(FileInterceptor('file'))
    async profileUploadAvatar(
        @Body() body,
        @UploadedFile() file: Express.Multer.File,
    ) {

        
        
        const userId = JSON.parse(body.payload)?._id
        return await this.userService.profileUploadAvatar(file, userId)

    }

}
