import * as bcrypt from 'bcryptjs';

import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import UsersService from '@v1/users/users.service';

import JwtTokensDto from './dto/jwt-tokens.dto';
import { DecodedUser } from './interfaces/decoded-user.interface';
import { LoginPayload } from './interfaces/login-payload.interface';
import { ValidateUserOutput } from './interfaces/validate-user-output.interface';

import authConstants from './auth-constants';
import AuthRepository from './auth.repository';

@Injectable()
export default class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly authRepository: AuthRepository,
    private readonly configService: ConfigService
  ) {}

  async validateUser(email: string, password: string): Promise<null | ValidateUserOutput> {
    const user = await this.usersService.getVerifiedUserByEmail(email);

    if (!user) {
      throw new NotFoundException('The item does not exist');
    }

    const passwordCompared = await bcrypt.compare(password, user.password);

    if (passwordCompared) {
      return {
        id: user.id,
        email: user.email,
        role: user.role,
      };
    }

    return null;
  }

  async login(data: LoginPayload): Promise<JwtTokensDto> {
    const payload: LoginPayload = {
      id: data.id,
      email: data.email,
      role: data.role,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: authConstants.jwt.expirationTime.accessToken,
      secret:
        this.configService.get<string>('ACCESS_TOKEN') || 'this.authService.verifyToken',
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: authConstants.jwt.expirationTime.refreshToken,
      secret:
        this.configService.get<string>('REFRESH_TOKEN') || 'this.authService.verifyToken',
    });

    await this.authRepository.addRefreshToken(payload.email as string, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  async getRefreshTokenByEmail(email: string): Promise<any> {
    return await this.authRepository.getToken(email);
  }

  async deleteTokenByEmail(email: string): Promise<any> {
    return await this.authRepository.removeToken(email);
  }

  async deleteAllTokens(): Promise<string> {
    return await this.authRepository.removeAllTokens();
  }

  async verifyToken(token: string, secret: string): Promise<DecodedUser | null> {
    try {
      const user = await this.jwtService.verifyAsync(token, { secret });

      return user;
    } catch (error) {
      return null;
    }
  }
}
