import { Body, Controller, Post, UploadedFiles, UseInterceptors, } from '@nestjs/common';
import { PostsService } from './posts.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { GetPostsDto } from './posts.dto';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    @Post('get-posts')
    async getPosts(@Body() body: GetPostsDto) {
        return await this.postsService.getPosts(body)
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

}
