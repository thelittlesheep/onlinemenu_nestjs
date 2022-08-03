/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
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
import { Request, Response } from 'express';
import { userDTO } from './DTO/user.DTO';
import { AllowAny } from '@/auth/authenticaed.decorator';
import { LocalAuthGuard } from '@/auth/local-auth.guard';
import { OrderService } from '@/menu/service/order.service';
import { orderCreateDTO } from '@/menu/DTO/order.DTO';
import userLoginDTO from './DTO/userLogin.DTO';
import {
  usersorders_READ_Apiparam_Schema,
  usersorders_DELETE_Apiparam_Schema,
} from './user.ApiParam.Schema';
import userInfoDTO from './DTO/userInfo.DTO';
import { ResponseError, ResponseSuccess } from '../share/response.interface';
import { ISession } from '@/custom.interface';
import { Action } from '@/ability/ability.factory';
import { CheckAbilities } from '@/ability/ability.decorator';
import { AbilityGuard } from '@/ability/ability.guard';
import { BadRequestExceptionFilter } from '@/share/badRequest.filter';

@ApiTags('user')
@Controller()
export class UserController {
  constructor(
    protected user_Service: UserService,
    protected order_Service: OrderService, // private abilityFactory: AbilityFactory,
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
  login(@Req() req) {
    // return this.authService.login(req.user);
    // request內之user是由LocalAuthGuard->LoaclStrategy->authService.validateUser
    // 回傳的user，若要抓取user_id，可以使用req.user.user_id
    // return {
    //   message: 'login success',
    //   responseData: { user_id: req.user.user_id },
    // };
    return ResponseSuccess.responseGenerator('成功登入', {
      user_id: req.user.user_id,
    });
  }

  // 使用者登出
  @Post('/logout')
  @ApiOperation({
    summary: '使用者登出',
    description: '使用者登出',
  })
  logout(@Req() req: Request) {
    // kill current session in redis
    // req.logOut();
    req.session.destroy((err) => {
      if (err) {
        throw new HttpException(
          '找不到該使用者之Session',
          HttpStatus.UNAUTHORIZED,
        );
      }
    });
    // session.destroy(null);
    return ResponseSuccess.responseGenerator('成功登出', null);
  }

  // 取得所有使用者，僅管理員有權限使用
  @Get('/')
  @UseGuards(AbilityGuard)
  @CheckAbilities({ action: Action.Read, subject: 'users' })
  @ApiOperation({
    summary: '取得所有使用者資訊，僅管理員有權限使用',
    description: '取得所有使用者資訊，僅管理員有權限使用',
  })
  async getAllUser(@Req() req) {
    return ResponseSuccess.responseGenerator(
      '成功取得所有使用者資料',
      await this.user_Service.getAllUser(),
    );
  }

  @Get('UserInfoandOrders')
  @ApiOperation({
    summary: '取得使用者資料及其訂單',
    description: '取得使用者資料及其訂單',
  })
  async getUserInfoandOrders(@Req() req) {
    return ResponseSuccess.responseGenerator(
      '成功取得使用者資料及其訂單',
      await this.order_Service.getUserOrders(req.user.user_id),
    );
  }

  // 新增使用者
  @Post('/')
  @AllowAny()
  @ApiBody({ type: userDTO })
  @ApiOperation({
    summary: '新增使用者',
    description: '新增使用者',
  })
  async createUser(@Body() user: userDTO) {
    return ResponseSuccess.responseGenerator(
      '成功新增使用者',
      await this.user_Service.createUser(user),
    );
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
  getUser(@Req() req, @Res({ passthrough: true }) res: Response) {
    // 返回redis中的使用者資料
    return ResponseSuccess.responseGenerator('成功取得使用者資料', req.user);
  }

  @Put('/:user_id')
  @UseFilters(new BadRequestExceptionFilter())
  @ApiBody({ type: userInfoDTO })
  @ApiOperation({
    summary: '修改使用者',
    description: '修改使用者',
  })
  async updateUser(
    @Param() queryParams: { user_id },
    @Body() user: userInfoDTO,
    @Session() session: ISession,
  ) {
    return ResponseSuccess.responseGenerator(
      '成功修改使用者資料',
      await this.user_Service.updateUser(queryParams.user_id, user, session),
    );
  }
}

@ApiTags('user Order')
@Controller()
export class UserOrderController {
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
  async getOrders(@Req() req, @Param() queryParams: { user_id }) {
    return ResponseSuccess.responseGenerator(
      '成功取得使用者訂單',
      await this.order_Service.getUserOrders(queryParams.user_id),
    );
  }

  @Post('/:user_id/orders')
  @ApiOperation({
    summary: '新增一筆使用者的訂單',
    description: '新增一筆使用者的訂單',
  })
  @ApiBody({ type: orderCreateDTO })
  async createUserOrder(@Body() orders: orderCreateDTO) {
    await this.order_Service.createUserOrder(orders);
    return ResponseSuccess.responseGenerator('成功新增使用者訂單', null);
  }

  @Get('/:user_id/orders/:order_id')
  @ApiOperation({
    summary: '查詢一筆使用者訂單',
    description: '查詢一筆使用者訂單',
  })
  async getUserOrder(@Param() queryParams: usersorders_READ_Apiparam_Schema) {
    return ResponseSuccess.responseGenerator(
      '成功取得使用者訂單',
      await this.order_Service.getUserOrder(
        queryParams.user_id,
        queryParams.order_id,
      ),
    );
  }

  @Delete('/:user_id/orders/:order_id')
  @ApiOperation({
    summary: '刪除一筆使用者訂單',
    description: '刪除一筆使用者訂單',
  })
  async deleteUserOrder(
    @Param() queryParams: usersorders_DELETE_Apiparam_Schema,
  ) {
    return ResponseSuccess.responseGenerator(
      '成功刪除使用者訂單',
      await this.order_Service.deleteUserOrder(
        queryParams.user_id,
        queryParams.order_id,
      ),
    );
    // return this.order_Service.deleteUserOrder(
    //   queryParams.user_id,
    //   queryParams.order_id,
    // );
  }
}
