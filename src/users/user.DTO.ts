import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsNumberString,
  IsString,
  IsOptional,
} from 'class-validator';

export class userDTO {
  @IsString()
  @ApiProperty()
  user_account: string;

  @IsString()
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
