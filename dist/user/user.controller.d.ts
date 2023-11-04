import { UserService } from './user.service';
import { ClosestUserDto, GetUsers, IDUserDto, UserTextInfoDTO } from './user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUsersByRole(body: GetUsers): Promise<import("./user.schema").User[]>;
    deleteUser(body: IDUserDto): Promise<void>;
    blockUser(body: IDUserDto): Promise<void>;
    userTextInfo(body: UserTextInfoDTO): Promise<{
        _id: string;
        fullName?: string;
        email?: string;
        role?: import("../enum/enum").ROLES;
        phone?: string;
    }>;
    getClosestUserByRole(body: ClosestUserDto): Promise<any>;
}
