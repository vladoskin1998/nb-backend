import { User } from './user.schema';
import { Model } from 'mongoose';
import { ROLES } from 'src/enum/enum';
import { JwtTokenService } from 'src/auth/jwt-auth.service';
import { FilesService } from 'src/files/files.service';
import { UserIdentityService } from 'src/user-identity/user-identity.service';
export declare class UserService {
    private readonly userModel;
    private readonly jwtTokenService;
    private readonly filesService;
    private readonly userIdentityService;
    constructor(userModel: Model<User>, jwtTokenService: JwtTokenService, filesService: FilesService, userIdentityService: UserIdentityService);
    getUsers({ role, searchName }: {
        role: ROLES;
        searchName: string;
    }): Promise<User[]>;
    deleteUser(_id: string): Promise<void>;
    blockUser(_id: string): Promise<void>;
}
