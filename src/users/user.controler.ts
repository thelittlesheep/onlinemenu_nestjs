/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

import { userDTO } from './user.DTO';
import { AuthenticatedGuard } from 'auth/authenticaed.guard';
import { AllowAny } from 'auth/authenticaed.decorator';
import { LocalAuthGuard } from 'auth/local-auth.guard';

@ApiTags('user')
@Controller()
export class usercontroller {
  constructor(protected user_Service: UserService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @AllowAny()
  login(@Request() req: Request) {
    // return this.authService.login(req.user);
    return { msg: 'login success' };
  }

  @Post('logout')
  logout(@Request() req) {
    req.session.destroy();
    return { msg: 'logout success' };
  }

  @Post()
  @AllowAny()
  @ApiParam(userDTO)
  createuser(@Body() user: userDTO) {
    return this.user_Service.adduser(user);
  }

  @UseGuards(AuthenticatedGuard)
  @Get()
  @ApiResponse({ type: userDTO })
  getuser(@Request() req) {
    return req.user;
  }

  // @UseGuards(AuthenticatedGuard)
  @Get('/userInfoAndOrders/')
  getUserOrders(@Request() req) {
    return this.user_Service.getUserOrders(req.user.user_id);
  }
}
