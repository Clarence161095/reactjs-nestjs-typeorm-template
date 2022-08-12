import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

const DtoFactory = {
  wrap<T>(responseDto: T): Type<unknown> {
    class SuccessResponseDto {
      @ApiProperty({ type: String })
      public readonly message: string = '';

      @ApiProperty({ type: responseDto })
      public readonly data: T | null = null;
    }

    return SuccessResponseDto;
  },
};

const AppUtils = {
  DtoFactory,
};

export default AppUtils;
