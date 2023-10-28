import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Likes } from './likes.schema';
import { LikesUpdateDTO } from './likes.dto';

@Injectable()
export class LikesService {

    constructor(
        @InjectModel(Likes.name)
        private readonly likesModel: Model<Likes>,

    ) { }

    async updateLike(body: LikesUpdateDTO) {
        try {
            const likeId = new Types.ObjectId(body.likeId)
            const userId = body.userId
            const likeDocument = await this.likesModel.findOne({ _id: likeId });
            if (likeDocument) {
                const index = likeDocument.usersId.indexOf(userId);

                if (index === -1) {
                    likeDocument.usersId.push(userId);


                } else {
                    likeDocument.usersId.splice(index, 1);
                }
                console.log(likeDocument);
                await this.likesModel.updateOne({ _id: likeDocument._id }, { usersId: likeDocument.usersId });
                return
            }
        } catch (error) {
            throw new Error(error);

        }

    }
}
