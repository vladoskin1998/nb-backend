/// <reference types="multer" />
import { UserService } from './user.service';
import { GetUsers, IDUserDto, LocationDto, ProfileTextInfoDTO } from './user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    logout(body: LocationDto): Promise<{
        isLocationVerify: boolean;
    }>;
    getUsersByRole(body: GetUsers): Promise<import("./user.schema").User[]>;
    deleteUser(body: IDUserDto): Promise<void>;
    blockUser(body: IDUserDto): Promise<void>;
    profileUploadAvatar(body: any, file: Express.Multer.File): Promise<{
        avatarFileName: string;
    }>;
    profileTextInfo(body: ProfileTextInfoDTO): Promise<{
        _id: string;
        interestZone: number;
        privacy: import("../enum/enum").PRIVACY;
        aboutMe: string;
        dateBirth: Date;
        cityBirth: string;
        sex: import("../enum/enum").SEX;
        orientation: import("../enum/enum").ORIENTATION;
        education: import("../enum/enum").EDUCATION;
        familyStatus: import("../enum/enum").FAMILYSTATUS;
    }>;
    profileIdentity(): Promise<void>;
}
