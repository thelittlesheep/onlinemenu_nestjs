import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { user } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(account: string, password: string): Promise<any> {
    const user = await this.userService.finduser(account);
    if (user.user_password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { user_account, user_password, ...rest } = user;
      return rest;
    }

    return null;
  }

  async login(user: user) {
    const payload = { name: user.user_name, sub: user.user_id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
