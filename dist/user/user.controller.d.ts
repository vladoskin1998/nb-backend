import { UserService } from './user.service';
import { GetUserByRoleDto, IDUserDto, LocationDto } from './user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    logout(body: LocationDto): Promise<{
        isLocationVerify: boolean;
    }>;
    getUsersByRole(body: GetUserByRoleDto): Promise<import("./user.schema").User[]>;
    deleteUser(body: IDUserDto): Promise<void>;
    blockUser(body: IDUserDto): Promise<void>;
}
