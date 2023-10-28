import { LikesService } from './likes.service';
import { LikesUpdateDTO } from './likes.dto';
export declare class LikesController {
    private readonly likesService;
    constructor(likesService: LikesService);
    updateLike(body: LikesUpdateDTO): Promise<void>;
}
