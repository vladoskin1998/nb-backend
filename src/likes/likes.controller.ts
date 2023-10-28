import { Body, Controller, Post } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesUpdateDTO } from './likes.dto';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post('update-like')
  async updateLike(@Body() body: LikesUpdateDTO){
    await this.likesService.updateLike(body)
  }
}
