import { Body, Controller, Get, HttpCode, Post, Query, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { UserIdentityService } from './user-identity.service';
import { QUALITYENUM } from 'src/enum/enum';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { GetUserIdentityDto, LocationDto, ProfileSelectDTO, ProfileTextInfoDTO } from './user-identity.dto';
import { IDUserDto } from 'src/user/user.dto';

@Controller('identity')
export class UserIdentityController {
    constructor(private readonly userIdentityService: UserIdentityService) { }
    
    @Post('get-user-identity')
    async getIdentityInforamation(@Body() body: GetUserIdentityDto){
        
        
        return await this.userIdentityService.getIdentityInforamation(body?._id, body.options)
    }
    

    @Post('upload-certificates')
    @UseInterceptors(FilesInterceptor('files'))
    async profileUploadCertificates(
        @Body() body,
        @UploadedFiles() files:Array<Express.Multer.File>,
    ) {
        const userId = JSON.parse(body.payload)?._id
        const uploadedCertificates = JSON.parse(body.payload)?.uploadedCertificates
        return await this.userIdentityService.profileUploadCertificates(files, userId, uploadedCertificates)

    }

    @Post('profile-text-info')
    async profileTextInfo(
        @Body() body: ProfileTextInfoDTO
    ){
        return await this.userIdentityService.profileTextInfo(body)
    }

    /// user profile Profession Skills Interests Nationality
    @Post('put-profile-identity')
    async profileIdentity(
        @Body() body: ProfileSelectDTO
    ) {         
        return await this.userIdentityService.profileIdentity(body)
    }

    
    @Post('profile-location')
    async logout(@Body() body: LocationDto) {
        return await this.userIdentityService.changeLocation(body)
    }


    @Post('nationality')
    async getCountriesList(@Body() body: {
        searchValue: string
    }) {
        return await this.userIdentityService.getCountriesList(body.searchValue)
    }

    @Get('nationality-popular')
    async getPopularCountriesList() {
        return this.userIdentityService.getPopularCountriesList()
    }


    @Post('profession')
    async getProfessionList(@Body() body: {
        searchValue: string
    }) {
        return await this.userIdentityService.getSkillProfInterest(body.searchValue, QUALITYENUM.PROFESSION)
    }

    @Get('profession-popular')
    async getPopularProfessionList() {
     
        
        return this.userIdentityService.getPopularSkillProfInterest(QUALITYENUM.PROFESSION)
    }

    @Post('interests')
    async getInterestsList(@Body() body: {
        searchValue: string
    }) {
        return await this.userIdentityService.getSkillProfInterest(body.searchValue, QUALITYENUM.INTERESTS)
    }

    @Get('interests-popular')
    async getPopularInterestsList() {
        return this.userIdentityService.getPopularSkillProfInterest(QUALITYENUM.INTERESTS)
    }

    @Post('skills')
    async getSkillsList(@Body() body: {
        searchValue: string
    }) {
        return await this.userIdentityService.getSkillProfInterest(body.searchValue, QUALITYENUM.SKILLS)
    }

    @Get('skills-popular')
    async getPopularSkillsList() {
        return this.userIdentityService.getPopularSkillProfInterest(QUALITYENUM.SKILLS)
    }
}
