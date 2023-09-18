import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { LocationDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  
  @Post('location')
  async logout(@Body() body: LocationDto)  {
      return await this.userService.changeLocation(body)
  }
}
