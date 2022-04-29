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
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../auth/local-auth.guard';

@Controller()
export class usercontroller {
  constructor(protected user_Service: UserService) {}

  @Post()
  create(@Body() user: userDTO) {
    console.log(user);
    return this.user_Service.adduser(user);
  }

  @Get('/userorders/:user_id')
  @ApiParam({
    name: 'user_id',
    example: '1',
    description:
      "Query an product basic profile by it's id. It will return an array.",
  })
  getUserOrders(@Param('user_id') user_id: number) {
    return this.user_Service.getUserOrders(user_id);
  }

  @Get(':user_account')
  getuserbyuser_account(@Param('user_account') user_account) {
    return this.user_Service.finduser(user_account);
  }

  // @Get('getuserbyQB')
  // getuser() {
  //   return this.user_Service.getuserbyQueryBuilder();
  // }
}
