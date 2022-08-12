/* eslint-disable operator-linebreak */
import { Roles, RolesEnum } from '@decorators/roles.decorator';
import Serialize from '@decorators/serialization.decorator';
import JwtAccessGuard from '@guards/jwt-access.guard';
import WrapResponseInterceptor from '@interceptors/wrap-response.interceptor';
import { PaginatedUsersInterface } from '@interfaces/paginatedEntity.interface';
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import { SuccessResponseInterface } from '@interfaces/success-response.interface';
import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import { AllUsersResponseEntity } from '@v1/users/entities/user-response.entity';
import PaginationUtils from '../../../utils/pagination.utils';
import ResponseUtils from '../../../utils/response.utils';
import UserEntity from './schemas/user.entity';
import UsersService from './users.service';

@ApiTags('Users')
@ApiBearerAuth()
@UseInterceptors(WrapResponseInterceptor)
@ApiExtraModels(UserEntity)
@SkipThrottle()
@Controller()
export default class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(UserEntity),
        },
      },
    },
    description: '200. Success. Returns a user',
  })
  @ApiNotFoundResponse({
    description: '404. NotFoundException. User was not found',
  })
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
      },
    },
    description: '401. UnauthorizedException.',
  })
  @ApiParam({ name: 'id', type: String })
  @Get(':id')
  @UseGuards(JwtAccessGuard)
  @Serialize(AllUsersResponseEntity)
  async getById(@Param('id', ParseUUIDPipe) id: string): Promise<SuccessResponseInterface> {
    const foundUser = await this.usersService.getVerifiedUserById(id);

    if (!foundUser) {
      throw new NotFoundException('The user does not exist');
    }

    return ResponseUtils.success('users', foundUser);
  }

  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(UserEntity),
        },
      },
    },
    description: '200. Success. Returns all users',
  })
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
      },
    },
    description: '401. UnauthorizedException.',
  })
  @Get()
  @Roles(RolesEnum.admin)
  @UseGuards(JwtAccessGuard)
  @Serialize(AllUsersResponseEntity)
  async getAllVerifiedUsers(@Query() query: any) {
    const paginationParams: PaginationParamsInterface | false = PaginationUtils.normalizeParams(
      query.page
    );
    if (!paginationParams) {
      throw new BadRequestException('Invalid pagination parameters');
    }

    const paginatedUsers: PaginatedUsersInterface =
      await this.usersService.getAllVerifiedWithPagination(paginationParams);

    return ResponseUtils.success('users', paginatedUsers.paginatedResult, {
      location: 'users',
      paginationParams,
      totalCount: paginatedUsers.totalCount,
    });
  }
}
