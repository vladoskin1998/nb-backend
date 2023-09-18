import { User } from './user.schema';
import { Model } from 'mongoose';
import { LocationDto } from './user.dto';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    changeLocation(body: LocationDto): Promise<{
        isLocationVerify: boolean;
    }>;
}
