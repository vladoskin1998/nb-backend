import { UserService } from './user.service';
import { GetUsers, IDUserDto } from './user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUsersByRole(body: GetUsers): Promise<import("./user.schema").User[]>;
    deleteUser(body: IDUserDto): Promise<void>;
    blockUser(body: IDUserDto): Promise<void>;
}
