import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    // 由URL傳入之params為string，需轉為number
    const params_user_id = Number(request.params.user_id);

    const allowAny = this.reflector.get<string[]>(
      'allow-any',
      context.getHandler(),
    );
    if (allowAny) return true;
    if (request.user === undefined) {
      // if (request.url === '/user/logout') {
      //   throw new HttpException('Already Logout Or Not Login yet', 401);
      // }
      // throw new UnauthorizedException('已經登出或尚未登入!');
      throw new HttpException('已經登出或尚未登入!', HttpStatus.CONFLICT);
    }
    if (request.user.user_id === params_user_id) {
      return true;
    } else {
      // NaN === NaN is false !!!
      if (Number.isNaN(params_user_id)) return request.isAuthenticated();
      // throw new UnauthorizedException('登入者與請求者不同，拒絕此請求');
      throw new HttpException(
        '登入者與請求者不同，拒絕此請求',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
