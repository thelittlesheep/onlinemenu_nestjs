import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { OrderService } from '../service/order.service';
import { orderDTO } from '../DTO/orderDTO';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('order')
@Controller('order')
export class ordercontroller {
  constructor(protected order_Service: OrderService) {}

  @Post()
  // @ApiParam(orderDTO)
  @ApiBody({ type: orderDTO })
  createOrder(@Body() orders: orderDTO) {
    return this.order_Service.addToOrderTable(orders);
  }

  @Get()
  @ApiQuery({
    name: 'order_id',
    example: '1',
    description: "Query an order detail by it's id. It will return an Object.",
  })
  getOrder(@Request() req, @Query() queryParams: { order_id: number }) {
    return this.order_Service.getOrder(req.user.user_id, queryParams.order_id);
  }

  @Delete()
  @ApiQuery({
    name: 'order_id',
    example: '1',
    description:
      "Query an product basic profile by it's order_id. It will return an array.",
  })
  deleteUserOrder(@Request() req, @Query() queryParams: { order_id: number }) {
    return this.order_Service.deleteUserOrder(
      req.user.user_id,
      queryParams.order_id,
    );
  }
}
