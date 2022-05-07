import { ApiProperty } from '@nestjs/swagger';
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
    message: 'user_account 開頭必需為英文字母，且需為6-9位元',
  })
  @ApiProperty()
  user_account: string;

  @Matches(/^\w{6,24}$/, {
    message: 'user_password 密碼是6-24個字符',
  })
  @ApiProperty()
  user_password: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Huang' })
  user_name: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ description: '輸入欲註冊之信箱' })
  user_email: string;

  @IsOptional()
  @IsNumberString()
  @ApiProperty({ example: '0910123456' })
  user_phone: string;

  @IsOptional()
  @IsNumber({
    allowInfinity: false,
    allowNaN: true,
  })
  @ApiProperty()
  user_age: number;
}
