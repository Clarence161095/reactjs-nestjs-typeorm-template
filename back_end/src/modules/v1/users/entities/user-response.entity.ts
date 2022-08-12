/* eslint-disable indent */
/* eslint-disable max-classes-per-file */
import { RolesEnum } from '@decorators/roles.decorator';
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import { Exclude, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class UserResponseEntity {
  id: number = 0;

  role: RolesEnum = RolesEnum.user;

  verified: boolean = false;

  email: string = '';

  @Exclude()
  password: string = '';
}

export class AllUsersResponseEntity {
  @ValidateNested({ each: true })
  @Type(() => UserResponseEntity)
  data?: [] = [];

  collectionName?: string = '';

  options?: {
    location: string;
    paginationParams: PaginationParamsInterface;
    totalCount: number;
  };
}
