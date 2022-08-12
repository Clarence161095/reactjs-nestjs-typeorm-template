import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export default class RefreshTokenDto {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @MinLength(32)
  @IsString()
  readonly refreshToken: string = '';
}
