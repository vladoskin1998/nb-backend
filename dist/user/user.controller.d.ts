import { UserService } from './user.service';
import { LocationDto } from './user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    logout(body: LocationDto): Promise<{
        isLocationVerify: boolean;
    }>;
}
