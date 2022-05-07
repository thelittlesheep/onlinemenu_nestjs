import {
  CanActivate,
  ExecutionContext,
  HttpException,
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
    if (!request.user) {
      if (request.url === '/logout') {
        throw new HttpException('Already Logout', 401);
      }
      throw new HttpException('Unauthorized', 401);
    }
    if (request.user.user_id === params_user_id) {
      return true;
    } else {
      // (request.user.user_id, params_user_id);

      if (!params_user_id) return request.isAuthenticated();
      throw new HttpException('Unauthorized', 401);
    }
  }
}
