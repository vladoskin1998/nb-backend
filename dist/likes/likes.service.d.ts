import { Model } from 'mongoose';
import { Likes } from './likes.schema';
import { LikesUpdateDTO } from './likes.dto';
export declare class LikesService {
    private readonly likesModel;
    constructor(likesModel: Model<Likes>);
    updateLike(body: LikesUpdateDTO): Promise<void>;
}
