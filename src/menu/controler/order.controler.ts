import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
} from '@nestjs/common';
import { OrderService } from '../service/order.service';
import { orderDTO } from '../DTO/orderDTO';
import { ApiBody, ApiParam } from '@nestjs/swagger';

@Controller('order')
export class ordercontroller {
  constructor(protected order_Service: OrderService) {}

  @ApiBody({ description: 'body:any someMethod', type: [orderDTO] })
  @Post()
  createOrder(@Body() orders: orderDTO) {
    return this.order_Service.addToOrderTable(orders);
  }

  @Get(':order_id')
  @ApiParam({
    name: 'order_id',
    example: '1',
    description: "Query an order detail by it's id. It will return an Object.",
  })
  getOrder(@Param() order_id: number) {
    return this.order_Service.getOrder(order_id);
  }

  @Delete('/:order_id')
  @ApiParam({
    name: 'order_id',
    example: '1',
    description:
      "Query an product basic profile by it's order_id. It will return an array.",
  })
  deleteUserOrder(@Request() req, @Param('order_id') order_id: number) {
    return this.order_Service.deleteUserOrder(req.user.user_id, order_id);
  }
}
