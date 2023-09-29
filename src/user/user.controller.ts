import { Body, Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUsers, IDUserDto, LocationDto , ProfileTextInfoDTO } from './user.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { QUALITYENUM } from 'src/enum/enum';
import { ProfileSelectDTO } from 'src/user-identity/user-identity.dto';

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

    // @Post('upload-avatar')
    // @UseInterceptors(FileInterceptor('file'))
    // async profileUploadAvatar(
    //     @Body() body,
    //     @UploadedFile() file: Express.Multer.File,
    // ) {
    //     const userId = JSON.parse(body.payload)?._id
    //     return await this.userService.profileUploadAvatar(file, userId)

    // }

    // @Post('upload-certificates')
    // @UseInterceptors(FilesInterceptor('files'))
    // async profileUploadCertificates(
    //     @Body() body,
    //     @UploadedFiles() files:Array<Express.Multer.File>,
    // ) {
    //     const userId = JSON.parse(body.payload)?._id
    //     return await this.userService.profileUploadCertificates(files, userId)

    // }

    // @Post('profile-text-info')
    // async profileTextInfo(
    //     @Body() body: ProfileTextInfoDTO
    // ){
    //     return await this.userService.profileTextInfo(body)
    // }

    // /// user profile Profession Skills Interests Nationality
    // @Post('put-profile-identity')
    // async profileIdentity(
    //     @Body() body: ProfileSelectDTO
    // ) {         
    //     return await this.userService.profileIdentity(body)
    // }
}
