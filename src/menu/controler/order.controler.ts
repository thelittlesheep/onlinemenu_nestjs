import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from '../service/order.service';
import { orderDTO } from '../DTO/orderDTO';
@Controller('order')
export class ordercontroller {
  constructor(protected order_Service: OrderService) {}

  @Post()
  createOrder(@Body() orders: Array<orderDTO>) {
    console.log(orders);
    return this.order_Service.addToOrdersTable(orders);
  }
}
