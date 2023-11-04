import { User } from './user.schema';
import { Model, Types } from 'mongoose';
import { ClosestUserDto, UserTextInfoDTO } from './user.dto';
import { ROLES } from 'src/enum/enum';
import { JwtTokenService } from 'src/auth/jwt-auth.service';
import { UserIdentity } from 'src/user-identity/user-identity.schema';
export declare class UserService {
    private readonly userModel;
    private userIdentityModel;
    private readonly jwtTokenService;
    constructor(userModel: Model<User>, userIdentityModel: Model<UserIdentity>, jwtTokenService: JwtTokenService);
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
    checkUsersExist(userIds: string[]): Promise<{
        _id: Types.ObjectId;
    }[]>;
    getClosestUserByRole(body: ClosestUserDto): Promise<any>;
    getDistance({ myLat, myLng, lat, lng }: {
        myLat: number;
        myLng: number;
        lat: number;
        lng: number;
    }): number;
}
