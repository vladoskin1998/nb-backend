import { Body, Controller, Post, UploadedFiles, UseInterceptors, } from '@nestjs/common';
import { PostsService } from './posts.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AddCommentDto, AddMarkPostDto, AddRepostDto, GetMarkPostDto, GetPostDto, GetPostsDto } from './posts.dto';
import { IDUserDto } from 'src/user/user.dto';

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


    @Post('add-post')
    @UseInterceptors(FilesInterceptor('files'))
    async addPost(
        @Body() body,
        @UploadedFiles() files: Array<Express.Multer.File> | null,
    ) {
       const payload = JSON.parse(body.payload);
       return await this.postsService.addPost({files, payload})
    }

    @Post('add-comment')
    async addComment(@Body() body: AddCommentDto) {
        return await this.postsService.addComment(body)
    }

    @Post('add-repost')
    async addRepost(@Body() body: AddRepostDto) {
        return await this.postsService.addRepost(body)
    }

    @Post('delete-repost')
    async deleteRepost(@Body() body: AddRepostDto) {
        return await this.postsService.deleteRepost(body)
    }

    @Post('add-mark')
    async addMark(@Body() body: AddMarkPostDto) {
        return await this.postsService.addMark(body)
    }

    @Post('delete-mark')
    async deleteMark(@Body() body: AddMarkPostDto) {
        return await this.postsService.deleteMark(body)
    }
}
