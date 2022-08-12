import { PaginatedUsersInterface } from '@interfaces/paginatedEntity.interface';
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import { Injectable } from '@nestjs/common';
import SignUpDto from '@v1/auth/dto/sign-up.dto';
import * as bcrypt from 'bcryptjs';
import { UpdateResult } from 'typeorm/index';
import UpdateUserDto from './dto/update-user.dto';
import UserEntity from './schemas/user.entity';
import UsersRepository from './users.repository';

@Injectable()
export default class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async create(user: SignUpDto): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    return this.usersRepository.create({
      ...user,
      password: hashedPassword,
    });
  }

  public async getByEmail(email: string): Promise<UserEntity | undefined> {
    return this.usersRepository.getByEmail(email);
  }

  public async getVerifiedUserByEmail(email: string): Promise<UserEntity | undefined> {
    return this.usersRepository.getVerifiedUserByEmail(email);
  }

  public getUnverifiedUserByEmail(email: string): Promise<UserEntity | undefined> {
    return this.usersRepository.getUnverifiedUserByEmail(email);
  }

  public async getById(id: string): Promise<UserEntity | undefined> {
    return this.usersRepository.getById(id);
  }

  public async getVerifiedUserById(id: string): Promise<UserEntity | undefined> {
    return this.usersRepository.getVerifiedUserById(id);
  }

  public async getUnverifiedUserById(id: string): Promise<UserEntity | undefined> {
    return this.usersRepository.getUnverifiedUserById(id);
  }

  update(id: string, data: UpdateUserDto): Promise<UpdateResult> {
    return this.usersRepository.updateById(id, data);
  }

  public async getAllVerifiedWithPagination(
    options: PaginationParamsInterface
  ): Promise<PaginatedUsersInterface> {
    return this.usersRepository.getAllVerifiedWithPagination(options);
  }
}
