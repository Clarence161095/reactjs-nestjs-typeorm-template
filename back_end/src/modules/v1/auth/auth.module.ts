import { CacheModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import UsersModule from '@v1/users/users.module';
import AuthRepository from './auth.repository';
import JwtAccessStrategy from './strategies/jwt-access.strategy';
import JwtRefreshStrategy from './strategies/jwt-refresh.strategy';
import LocalStrategy from './strategies/local.strategy';

import authConstants from './auth-constants';

import AuthController from './auth.controller';
import AuthService from './auth.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: authConstants.jwt.secret,
    }),
    CacheModule.register(),
  ],
  providers: [AuthService, LocalStrategy, JwtAccessStrategy, JwtRefreshStrategy, AuthRepository],
  controllers: [AuthController],
  exports: [AuthService],
})
export default class AuthModule {}
