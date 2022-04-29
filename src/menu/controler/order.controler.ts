import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { OrderService } from '../service/order.service';
import { orderDTO } from '../DTO/orderDTO';
import { ApiBody, ApiParam } from '@nestjs/swagger';

@Controller('order')
export class ordercontroller {
  constructor(protected order_Service: OrderService) {}

  @ApiBody({ description: 'body:any someMethod', type: [orderDTO] })
  @ApiParam({
    name: 'user_id',
    description: '訂單的使用者id',
    allowEmptyValue: false,
  })
  @Post()
  createOrder(@Body() orders: orderDTO) {
    // console.log(orders);
    return this.order_Service.addToOrderTable(orders);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    example: '1',
    description: "Query an order detail by it's id. It will return an Object.",
  })
  getOrder(@Param() param: { id: string }) {
    return this.order_Service.getOrder(param.id);
  }

  @Delete('/user_id=:user_id&order_id=:order_id')
  @ApiParam({
    name: 'user_id',
    example: '1',
    description:
      "Query an product basic profile by it's user_id. It will return an array.",
  })
  @ApiParam({
    name: 'order_id',
    example: '1',
    description:
      "Query an product basic profile by it's order_id. It will return an array.",
  })
  deleteUserOrder(
    @Param('user_id') user_id: number,
    @Param('order_id') order_id: number,
  ) {
    return this.order_Service.deleteUserOrder(user_id, order_id);
  }
}
