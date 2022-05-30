import { PassportStrategy } from '@nestjs/passport';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Strategy } from 'passport-local';

@Injectable()
export class LoaclStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // PassportStrategy 預設使用從request body接受之認證欄位為 username 及 password
    // 若不想使用這些欄位名稱，可以在constructor中傳入自定義的認證欄位
    super({ usernameField: 'user_account', passwordField: 'user_password' });
  }

  async validate(user_account: string, user_password: string): Promise<any> {
    const user = await this.authService.validateUser(
      user_account,
      user_password,
    );

    if (!user) {
      // throw new UnauthorizedException();
      throw new HttpException('登入之使用者不存在', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
