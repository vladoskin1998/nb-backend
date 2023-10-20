import { Injectable } from '@nestjs/common';
import { PublishPosts } from './publish-posts.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { FilesService } from 'src/files/files.service';
import { PRIVACY } from 'src/enum/enum';

@Injectable()
export class PostsService {


    constructor(
        @InjectModel(PublishPosts.name)
        private readonly publishPostsModel: Model<PublishPosts>,
        private filesService: FilesService
    ) { }

    async getPost() {

    }

    async addPost(
        { payload, files }: { payload: { privacyPost: PRIVACY, title: string, text: string, userId: string, coordinates: { lat: number; lng: number } }, files: Array<Express.Multer.File> }
    ) {
        try {
            const userId = new Types.ObjectId(payload.userId)
            const filesName = await this.filesService.uploadFiles(files, 'uploads/publish_post', false)
            return await this.publishPostsModel.create({
                ...payload, filesName, userId
            })
        } catch (error) {

        }
    }
}
