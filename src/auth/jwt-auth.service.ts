import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ROLES } from 'src/enum/enum';
import { Authentication } from './auth.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

type roleType = ROLES.ADMIN | ROLES.USER;

@Injectable()
export class JwtTokenService {
  constructor(
    @InjectModel(Authentication.name) private authModel: Model<Authentication>,
    private readonly jwtService: JwtService,
  ) {}

  generateTokens(payload: { email: string; role: roleType; id: string }) {
    const accessToken = this.jwtService.sign(
      payload,
      { expiresIn: '150s' },
    );
    const refreshToken = this.jwtService.sign(
      payload,
      { expiresIn: '300s' },
    );
    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token) {
    try {
      const userData = this.jwtService.verify(token);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = this.jwtService.verify(token);
      return userData;
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await this.authModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await this.authModel.create({ user: userId, refreshToken });
    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await this.authModel.deleteOne({ refreshToken });
    return tokenData;
  }

  async findToken(refreshToken) {
    const tokenData = await this.authModel.findOne({ refreshToken });
    return tokenData;
  }
}
