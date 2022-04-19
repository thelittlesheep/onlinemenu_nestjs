import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { order } from 'menu/entity/order.entity';
import { order_product_adjustitem } from 'menu/entity/order_product_adjustitem.entity';
import { Connection, Repository } from 'typeorm';
import { orderDTO } from '../DTO/orderDTO';
import { order_product } from '../entity/order_product.entity';
import { getConnection } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectConnection('onlinemenu')
    private connection: Connection,
  ) {}

  async addToOrdersTable(datas: Array<orderDTO>) {
    return Array.from(datas).forEach((data) => {
      this.addToOrderTable(data);
    });
  }

  async addToOrderTable(data: orderDTO) {
    const varorder = new order();
    varorder.user_id = data.user_id;
    varorder.order_quantity = data.order_quantity;
    varorder.order_orderdate = data.order_orderdate;
    varorder.order_pickupdate = data.order_pickupdate;

    const varorder_product = new order_product();
    varorder_product.order_product_quantity = data.order_product_quantity;
    varorder_product.product_id = data.product_id;

    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(varorder);
      const orderId = await queryRunner.manager.getId(varorder);

      varorder_product.order_id = orderId;
      await queryRunner.manager.save(varorder_product);
      const order_productID = await queryRunner.manager.getId(varorder_product);

      data.adjustitems.forEach(async (item) => {
        await queryRunner.manager.insert(order_product_adjustitem, {
          order_product_id: order_productID,
          adjustitem_id: item,
        });
      });

      await queryRunner.commitTransaction();
      return 'success';
    } catch (e) {
      console.log(e);
    } finally {
      await queryRunner.release();
    }
  }
}
