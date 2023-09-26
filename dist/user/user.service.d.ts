/// <reference types="multer" />
import { User } from './user.schema';
import { Model } from 'mongoose';
import { LocationDto, ProfileTextInfoDTO } from './user.dto';
import { ROLES } from 'src/enum/enum';
import { JwtTokenService } from 'src/auth/jwt-auth.service';
import { FilesService } from 'src/files/files.service';
export declare class UserService {
    private readonly userModel;
    private readonly jwtTokenService;
    private readonly filesService;
    constructor(userModel: Model<User>, jwtTokenService: JwtTokenService, filesService: FilesService);
    changeLocation(body: LocationDto): Promise<{
        isLocationVerify: boolean;
    }>;
    getUsers({ role, searchName }: {
        role: ROLES;
        searchName: string;
    }): Promise<User[]>;
    deleteUser(_id: string): Promise<void>;
    blockUser(_id: string): Promise<void>;
    profileUploadAvatar(file: Express.Multer.File, _id: string): Promise<{
        avatarFileName: string;
    }>;
    profileTextInfo(body: ProfileTextInfoDTO): Promise<{
        _id: string;
        interestZone: number;
        privacy: import("src/enum/enum").PRIVACY;
        aboutMe: string;
        dateBirth: Date;
        cityBirth: string;
        sex: import("src/enum/enum").SEX;
        orientation: import("src/enum/enum").ORIENTATION;
        education: import("src/enum/enum").EDUCATION;
        familyStatus: import("src/enum/enum").FAMILYSTATUS;
    }>;
}
