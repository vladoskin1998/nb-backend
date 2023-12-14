import { Body, Controller, Post, UploadedFiles, UseInterceptors, } from '@nestjs/common';
import { PostsService } from './posts.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AddCommentDto, AddMarkPostDto, AddRepostDto, ChangePostPrivacyDto, DeletePostDto, GetMarkPostDto, GetPostDto, GetPostsDto, NotificationPostDto, PostHideDto, UpdatePinPostDto } from './posts.dto';
import { IDUserDto } from 'src/user/user.dto';
import { UserIdDTO } from 'src/notification/notification.dto';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    @Post('get-posts')
    async getPosts(@Body() body: GetPostsDto) {
        return await this.postsService.getPosts(body)
    }

    @Post('get-post')
    async getPost(@Body() body: GetPostDto) {
        return await this.postsService.getOnePost(body)
    }

    @Post('get-post')
    async getPostByMark(@Body() body: GetMarkPostDto){
        return await this.postsService.getPostByMark(body)
    }
    
    @Post('get-comments')
    async getComments(@Body() body: GetPostDto) {
        return await this.postsService.getComments(body)
    }

    @Post('get-my-comments')
    async getMyComments(@Body() body: IDUserDto) {
        return await this.postsService.getMyComments(body)
    }

    @Post('get-post-pin')
    async getPostPin(@Body() body: UserIdDTO) {
        return await this.postsService.getPostPin(body)
    }


    @Post('add-post')
    @UseInterceptors(FilesInterceptor('files'))
    async addPost(
        @Body() body,
        @UploadedFiles() files: Array<Express.Multer.File> | null,
    ) {
       const payload = JSON.parse(body.payload);
       return await this.postsService.addPost({files, payload})
    }
    
    @Post('change-post-privacy')
    async changePostPrivacy(@Body() body: ChangePostPrivacyDto) {
        return await this.postsService.changePostPrivacy(body)
    }

    @Post('update-post-pin')
    async updatePostPin(@Body() body: UpdatePinPostDto) {
        return await this.postsService.updatePostPin(body)
    }

    @Post('add-comment')
    async addComment(@Body() body: AddCommentDto) {
        return await this.postsService.addComment(body)
    }

    @Post('update-notification')
    async updateNotification(@Body() body: NotificationPostDto) {
        return await this.postsService.updateNotification(body)
    }

    @Post('update-repost')
    async updateRepost(@Body() body: AddRepostDto) {
        return await this.postsService.updateRepost(body)
    }

    @Post('add-mark')
    async addMark(@Body() body: AddMarkPostDto) {
        return await this.postsService.addMark(body)
    }

    @Post('delete-mark')
    async deleteMark(@Body() body: AddMarkPostDto) {
        return await this.postsService.deleteMark(body)
    }

    @Post('hide-post')
    async hidePost(@Body() body: PostHideDto) {
        return await this.postsService.hidePost(body)
    }

    @Post('delete-post')
    async deletePost(@Body() body: DeletePostDto) {
        return await this.postsService.deletePost(body)
    }
}
