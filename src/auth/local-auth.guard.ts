import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    // add custom cookie here
    // const response = context.switchToHttp().getResponse();
    // response.cookie('user_account', request.body.user_account);

    await super.logIn(request);
    return result;
  }
}
