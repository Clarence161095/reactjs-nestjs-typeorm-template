import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import authConstants from './auth-constants';

@Injectable()
export default class AuthRepository {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  public async addRefreshToken(email: string, token: string): Promise<void> {
    await this.cacheManager.set(email, token, {
      ttl: authConstants.cache.expirationTime.jwt.refreshToken,
    });
  }

  public async getToken(key: string): Promise<any> {
    return await this.cacheManager.get(key);
  }

  public async removeToken(key: string): Promise<number> {
    return await this.cacheManager.del(key);
  }

  public async removeAllTokens(): Promise<any> {
    return await this.cacheManager.reset();
  }
}
