/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { Response } from 'express';
import { userDTO } from './DTO/user.DTO';
import { AllowAny } from 'auth/authenticaed.decorator';
import { LocalAuthGuard } from 'auth/local-auth.guard';
import { OrderService } from 'menu/service/order.service';
import { orderDTO } from 'menu/DTO/orderDTO';
import userLoginDTO from './DTO/userLogin.DTO';
import {
  usersorders_READ_Apiparam_Schema,
  usersorders_DELETE_Apiparam_Schema,
} from './user.ApiParam.Schema';
import userInfoDTO from './DTO/userInfo.DTO';
import { ResponseError } from '../share/responseError.interface';

@ApiTags('user')
@Controller()
export class usercontroller {
  constructor(
    protected user_Service: UserService,
    protected order_Service: OrderService,
  ) {}
  // 使用者登入
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @AllowAny()
  @ApiBody({ type: userLoginDTO })
  @ApiOperation({
    summary: '使用者登入',
    description: '使用者登入',
  })
  login(@Request() req) {
    // return this.authService.login(req.user);
    // request內之user是由LocalAuthGuard->LoaclStrategy->authService.validateUser
    // 回傳的user，若要抓取user_id，可以使用req.user.user_id
    return { message: 'login success', user_id: req.user };
  }
  // 使用者登出
  @Post('logout')
  @ApiOperation({
    summary: '使用者登出',
    description: '使用者登出',
  })
  logout(@Request() req) {
    // kill current session in redis
    req.session.destroy();
    return { message: 'logout success' };
  }
  // 新增使用者
  @Post()
  @AllowAny()
  @ApiBody({ type: userDTO })
  @ApiOperation({
    summary: '新增使用者',
    description: '新增使用者',
  })
  createuser(@Body() user: userDTO) {
    return this.user_Service.createUser(user);
  }

  @Get()
  // @ApiResponse({ type: userInfoDTO })
  @ApiOkResponse({ description: '成功取得使用者基本資料', type: userInfoDTO })
  @ApiUnauthorizedResponse({
    description: '使用者未登入',
    type: ResponseError,
  })
  @ApiOperation({
    summary: '查詢使用者',
    description: '查詢使用者',
  })
  getuser(@Request() req, @Res({ passthrough: true }) res: Response) {
    res.status(HttpStatus.OK);
    return req.user;
  }

  @Put('/:user_id')
  @ApiBody({ type: userInfoDTO })
  @ApiOperation({
    summary: '修改使用者',
    description: '修改使用者',
  })
  updateuser(@Param() queryParams: { user_id }, @Body() user: userInfoDTO) {
    return this.user_Service.updateUser(queryParams.user_id, user);
  }

  @Get('/userInfoAndOrders/')
  getUserOrders(@Request() req) {
    return this.user_Service.getUserInfoandOrders(req.user.user_id);
  }
}

@ApiTags('user Order')
@Controller()
export class userOrdercontroller {
  constructor(
    protected user_Service: UserService,
    protected order_Service: OrderService,
  ) {}
  // ***************************************************************************
  // 使用者訂單相關
  // ***************************************************************************
  @Get('/:user_id/orders')
  @ApiOperation({
    summary: '查詢使用者所有的訂單',
    description: '查詢使用者所有的訂單',
  })
  getOrders(@Param() queryParams: { user_id }) {
    return this.user_Service.getOrders(queryParams.user_id);
  }

  @Post('/:user_id/orders')
  @ApiOperation({
    summary: '新增一筆使用者的訂單',
    description: '新增一筆使用者的訂單',
  })
  @ApiBody({ type: orderDTO })
  createOrder(@Body() orders: orderDTO) {
    return this.order_Service.addOrder(orders);
  }

  @Get('/:user_id/orders/:order_id')
  @ApiOperation({
    summary: '查詢一筆使用者訂單',
    description: '查詢一筆使用者訂單',
  })
  getOrder(@Param() queryParams: usersorders_READ_Apiparam_Schema) {
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
  deleteOrder(@Param() queryParams: usersorders_DELETE_Apiparam_Schema) {
    return this.order_Service.deleteOrder(
      queryParams.user_id,
      queryParams.order_id,
    );
  }
}
