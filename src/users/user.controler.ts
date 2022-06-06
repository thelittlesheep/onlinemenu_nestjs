/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Request,
  Res,
  Session,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { Response } from 'express';
import { userDTO } from './DTO/user.DTO';
import { AllowAny } from 'auth/authenticaed.decorator';
import { LocalAuthGuard } from 'auth/local-auth.guard';
import { OrderService } from 'menu/service/order.service';
import { orderDTO } from 'menu/DTO/order.DTO';
import userLoginDTO from './DTO/userLogin.DTO';
import {
  usersorders_READ_Apiparam_Schema,
  usersorders_DELETE_Apiparam_Schema,
} from './user.ApiParam.Schema';
import userInfoDTO from './DTO/userInfo.DTO';
import { ResponseError } from '../share/responseError.interface';
import { ISession } from 'custom';
import { AbilityFactory, Action } from 'ability/ability.factory';
import { user } from './user.entity';
import { CheckAbilities } from 'ability/ability.decorator';
import { AbilityGuard } from 'ability/ability.guard';
import { BadRequestExceptionFilter } from 'share/badRequest.filter';
import { HttpExceptionFilter } from 'share/responseError.filter';

@ApiTags('user')
@Controller()
export class usercontroller {
  constructor(
    protected user_Service: UserService,
    protected order_Service: OrderService,
    private abilityFactory: AbilityFactory,
  ) {}

  // 使用者登入
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @AllowAny()
  @ApiBody({ type: userLoginDTO })
  @ApiOperation({
    summary: '使用者登入',
    description: '使用者登入',
  })
  login(@Request() req, @Body() user: userLoginDTO) {
    // return this.authService.login(req.user);
    // request內之user是由LocalAuthGuard->LoaclStrategy->authService.validateUser
    // 回傳的user，若要抓取user_id，可以使用req.user.user_id
    return { message: 'login success', user_id: req.user.user_id };
  }

  // 使用者登出
  @Post('/logout')
  @ApiOperation({
    summary: '使用者登出',
    description: '使用者登出',
  })
  logout(@Request() req) {
    // kill current session in redis
    req.session.destroy();
    return { message: 'logout success' };
  }

  // 取得所有使用者，僅管理員有權限使用
  @Get('/')
  @UseGuards(AbilityGuard)
  @CheckAbilities({ action: Action.Read, subject: 'users' })
  @ApiOperation({
    summary: '取得所有使用者資訊，僅管理員有權限使用',
    description: '取得所有使用者資訊，僅管理員有權限使用',
  })
  getAllUser(@Request() req) {
    return this.user_Service.getAllUser();
  }

  @Get('UserInfoandOrders')
  @ApiOperation({
    summary: '取得使用者資料及其訂單',
    description: '取得使用者資料及其訂單',
  })
  getUserInfoandOrders(@Request() req) {
    return this.user_Service.getUserInfoandOrders(req.user.user_id);
  }

  // 新增使用者
  @Post('/')
  @AllowAny()
  @ApiBody({ type: userDTO })
  @ApiOperation({
    summary: '新增使用者',
    description: '新增使用者',
  })
  createUser(@Body() user: userDTO) {
    return this.user_Service.createUser(user);
  }

  @Get('/:user_id')
  @ApiParam({
    name: 'user_id',
  })
  @ApiOkResponse({ description: '成功取得使用者基本資料', type: userInfoDTO })
  @ApiUnauthorizedResponse({
    description: '使用者未登入',
    type: ResponseError,
  })
  @ApiOperation({
    summary: '查詢使用者',
    description: '查詢使用者',
  })
  // @UseInterceptors(HttpCacheInterceptor)
  // @UseInterceptors(CacheInterceptor)
  getUser(@Request() req, @Res({ passthrough: true }) res: Response) {
    res.status(HttpStatus.OK);
    // 返回redis中的使用者資料
    return req.user;
  }

  @Put('/:user_id')
  @UseFilters(new BadRequestExceptionFilter())
  @ApiBody({ type: userInfoDTO })
  @ApiOperation({
    summary: '修改使用者',
    description: '修改使用者',
  })
  updateUser(
    @Param() queryParams: { user_id },
    @Body() user: userInfoDTO,
    @Session() session: ISession,
  ) {
    return this.user_Service.updateUser(queryParams.user_id, user, session);
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
  getOrders(@Req() req, @Param() queryParams: { user_id }) {
    return this.user_Service.getOrders(queryParams.user_id);
  }

  @Post('/:user_id/orders')
  @ApiOperation({
    summary: '新增一筆使用者的訂單',
    description: '新增一筆使用者的訂單',
  })
  @ApiBody({ type: orderDTO })
  createOrder(@Body() orders: orderDTO) {
    return this.order_Service.createOrder(orders);
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
