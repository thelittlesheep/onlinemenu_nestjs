/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';

import { userDTO } from './DTO/user.DTO';
import { AuthenticatedGuard } from 'auth/authenticaed.guard';
import { AllowAny } from 'auth/authenticaed.decorator';
import { LocalAuthGuard } from 'auth/local-auth.guard';
import { OrderService } from 'menu/service/order.service';
import { orderDTO } from 'menu/DTO/orderDTO';
import userLoginDTO from './DTO/userLogin.DTO';
import {
  usersorders_GET_Apiparam_Schema,
  usersorders_DELETE_Apiparam_Schema,
} from './user.ApiParam.Schema';

@ApiTags('user')
@Controller()
export class usercontroller {
  constructor(
    protected user_Service: UserService,
    protected order_Service: OrderService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @AllowAny()
  @ApiBody({ type: userLoginDTO })
  login(@Request() req) {
    // return this.authService.login(req.user);
    return { msg: 'login success' };
  }

  @Post('logout')
  logout(@Request() req) {
    // kill current session in redis
    req.session.destroy();
    return { msg: 'logout success' };
  }

  @Post()
  @AllowAny()
  @ApiBody({ type: userDTO })
  createuser(@Body() user: userDTO) {
    return this.user_Service.adduser(user);
  }

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

  @Post('/:user_id/orders')
  @ApiOperation({
    summary: '新增一筆使用者訂單',
    description: '新增一筆使用者訂單',
  })
  @ApiBody({ type: orderDTO })
  createOrder(@Body() orders: orderDTO) {
    return this.order_Service.addToOrderTable(orders);
  }

  @Get('/:user_id/orders/:order_id')
  @ApiOperation({
    summary: '查詢一筆使用者訂單',
    description: '查詢一筆使用者訂單',
  })
  getOrder(@Param() queryParams: usersorders_GET_Apiparam_Schema) {
    return this.order_Service.getOrder(
      queryParams.user_id,
      queryParams.order_id,
    );
  }

  @Delete('/:user_id/orders/:order_id')
  @ApiOperation({
    summary: '刪除一筆使用者訂單',
    description: '刪除一筆使用者訂單',
  })
  deleteUserOrder(@Param() queryParams: usersorders_DELETE_Apiparam_Schema) {
    return this.order_Service.deleteUserOrder(
      queryParams.user_id,
      queryParams.order_id,
    );
  }
}
