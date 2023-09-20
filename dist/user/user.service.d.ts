import { User } from './user.schema';
import { Model } from 'mongoose';
import { LocationDto } from './user.dto';
import { ROLES } from 'src/enum/enum';
import { JwtTokenService } from 'src/auth/jwt-auth.service';
export declare class UserService {
    private readonly userModel;
    private readonly jwtTokenService;
    constructor(userModel: Model<User>, jwtTokenService: JwtTokenService);
    changeLocation(body: LocationDto): Promise<{
        isLocationVerify: boolean;
    }>;
    getUsers({ role, searchName }: {
        role: ROLES;
        searchName: string;
    }): Promise<User[]>;
    deleteUser(_id: string): Promise<void>;
    blockUser(_id: string): Promise<void>;
}
