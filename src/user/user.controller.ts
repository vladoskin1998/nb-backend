import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUsers, IDUserDto, LocationDto, ProfileTextInfoDTO } from './user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }


    @Post('profile-location')
    async logout(@Body() body: LocationDto) {
        console.log(body);

        return await this.userService.changeLocation(body)
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
        console.log(body);

        return await this.userService.blockUser(body._id)
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

    @Post('profile-text-info')
    async profileTextInfo(
        @Body() body: ProfileTextInfoDTO
    ){
   
        return await this.userService.profileTextInfo(body)
    }

    /// user profile Profession Skills Interests Nationality
    @Post('get-profile-identity')
    async profileIdentity() {

    }
}
