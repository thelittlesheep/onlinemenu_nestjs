import { ApiProperty } from '@nestjs/swagger';
import { Matches } from 'class-validator';
import userInfoDTO from './userInfo.DTO';

// same code as userLoginDTO, because userDTO can't extends both userLoginDTO and userInfoDTO at same time
export class userDTO extends userInfoDTO {
  @Matches(/^[a-zA-Z]\w{5,9}$/, {
    message: 'user_account 開頭必需為英文字母，且需為6-9字元。',
  })
  @ApiProperty({
    example: 'User123',
    description: '使用者帳號，開頭必需為英文字母，且需為6-9字元。',
  })
  user_account: string;

  @Matches(/^\w{6,24}$/, {
    message: 'user_password 密碼是6-24個字元',
  })
  @ApiProperty({
    example: 'password',
    description: '使用者密碼，必須為6-24個字元',
  })
  user_password: string;
}
