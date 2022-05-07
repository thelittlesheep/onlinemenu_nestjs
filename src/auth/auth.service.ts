import { HttpCode, HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { user } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    user_account: string,
    user_password: string,
  ): Promise<any> {
    const user = await this.userService.finduser(user_account);

    if (user && user.user_password === user_password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { user_account, user_password, ...rest } = user;
      return rest;
    }

    throw new HttpException('錯誤的帳號或密碼', 401);
  }

  async login(user: user) {
    const payload = { name: user.user_name, sub: user.user_id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
