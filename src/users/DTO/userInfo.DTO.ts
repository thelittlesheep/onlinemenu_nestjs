import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsEmail,
  IsNumberString,
  IsNumber,
} from 'class-validator';

export default class userInfoDTO {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Example', description: '使用者姓名' })
  user_name?: string;

  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional({
    example: 'example@example.com',
    description: '使用者信箱',
  })
  user_email?: string;

  @IsOptional()
  @IsNumberString(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: '請輸入數字' },
  )
  @ApiPropertyOptional({ example: '0912345678', description: '使用者連絡電話' })
  user_phone?: string;

  @IsOptional()
  @IsNumber({
    allowInfinity: false,
    allowNaN: true,
  })
  @ApiPropertyOptional({ example: '20', description: '使用者年齡' })
  user_age?: number;
}
