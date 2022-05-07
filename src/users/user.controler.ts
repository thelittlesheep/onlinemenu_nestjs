import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { UserService } from './user.service';

import { userDTO } from './user.DTO';
import { AuthenticatedGuard } from 'auth/authenticaed.guard';
import { AllowAny } from 'auth/authenticaed.decorator';

@Controller()
export class usercontroller {
  constructor(protected user_Service: UserService) {}

  @Post()
  @AllowAny()
  createuser(@Body() user: userDTO) {
    return this.user_Service.adduser(user);
  }

  @UseGuards(AuthenticatedGuard)
  @Get()
  getuser(@Request() req) {
    return req.user;
  }

  // @UseGuards(AuthenticatedGuard)
  @Get('/userInfoAndOrders/')
  // @ApiParam({
  //   name: 'user_id',
  //   example: '1',
  //   description:
  //     "Query an product basic profile by it's id. It will return an array.",
  // })
  getUserOrders(@Request() req) {
    return this.user_Service.getUserOrders(req.user.user_id);
  }

  // @Get(':user_account')
  // getuserbyuser_account(@Param('user_account') user_account) {
  //   return this.user_Service.finduser(user_account);
  // }

  // @Get('getuserbyQB')
  // getuser() {
  //   return this.user_Service.getuserbyQueryBuilder();
  // }
}
