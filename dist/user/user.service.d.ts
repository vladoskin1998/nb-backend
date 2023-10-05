import { User } from './user.schema';
import { Model, Types } from 'mongoose';
import { ChangePasswordDTO, UserTextInfoDTO } from './user.dto';
import { ROLES } from 'src/enum/enum';
import { JwtTokenService } from 'src/auth/jwt-auth.service';
export declare class UserService {
    private readonly userModel;
    private readonly jwtTokenService;
    constructor(userModel: Model<User>, jwtTokenService: JwtTokenService);
    getUsers({ _id, role, searchName }: {
        _id: string;
        role: ROLES;
        searchName: string;
    }): Promise<User[]>;
    deleteUser(_id: string): Promise<void>;
    blockUser(_id: string): Promise<void>;
    userTextInfo(body: UserTextInfoDTO): Promise<{
        _id: string;
        fullName?: string;
        email?: string;
        role?: ROLES;
        phone?: string;
    }>;
    userChangePassword(body: ChangePasswordDTO): Promise<string>;
    checkUsersExist(userIds: string[]): Promise<{
        _id: Types.ObjectId;
    }[]>;
}
