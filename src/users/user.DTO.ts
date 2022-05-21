import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsNumberString,
  IsString,
  IsOptional,
  Matches,
} from 'class-validator';

export class userDTO {
  @Matches(/^[a-zA-Z]\w{5,9}$/, {
    message: 'user_account 開頭必需為英文字母，且需為6-9字元',
  })
  @ApiProperty({ description: '使用者帳號，開頭必需為英文字母，且需為6-9字元' })
  user_account: string;

  @Matches(/^\w{6,24}$/, {
    message: 'user_password 密碼是6-24個字元',
  })
  @ApiProperty({ description: '使用者密碼，必須為6-24個字元' })
  user_password: string;

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
  @IsNumberString()
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
