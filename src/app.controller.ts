/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Post, UseGuards, Request, Res } from '@nestjs/common';
import { LocalAuthGuard } from 'auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { AllowAny } from 'auth/authenticaed.decorator';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}
  // @UseGuards(LocalAuthGuard)
  // @Post('login')
  // @AllowAny()
  // login(@Request() req: Request) {
  //   // return this.authService.login(req.user);
  //   return { msg: 'login success' };
  // }

  // @Post('logout')
  // logout(@Request() req) {
  //   req.session.destroy();
  //   return { msg: 'logout success' };
  // }
}
