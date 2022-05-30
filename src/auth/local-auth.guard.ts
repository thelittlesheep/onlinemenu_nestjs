import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    // 取得傳入之request
    const request = context.switchToHttp().getRequest();
    // 檢查request body之key是否存在並為正確之值
    const correctKeys = ['user_account', 'user_password'];
    const requestKeys = Object.keys(request.body).sort((a, b) => {
      return a.localeCompare(b);
    });
    // 如果不存在或不正確則拋出錯誤
    requestKeys.forEach((item) => {
      if (!correctKeys.includes(item)) {
        throw new HttpException('錯誤的POST body', HttpStatus.BAD_REQUEST);
      }
    });
    const result = (await super.canActivate(context)) as boolean;
    // add custom cookie here
    // const response = context.switchToHttp().getResponse();
    // response.cookie('user_account', request.body.user_account);
    await super.logIn(request);
    return result;
  }
}
