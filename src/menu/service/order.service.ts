import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { order } from '@/menu/entity/order.entity';
import { order_product } from '@/menu/entity/order_product.entity';
import { order_product_adjustitem } from '@/menu/entity/order_product_adjustitem.entity';
import { Connection, Repository } from 'typeorm';
import { orderDTO } from '../DTO/order.DTO';
import * as moment from 'moment';

@Injectable()
export class OrderService {
  constructor(
    @InjectConnection('onlinemenu')
    private connection: Connection,
    @InjectRepository(order, 'onlinemenu')
    private order_Respository: Repository<order>,
  ) {}

  // async addToOrdersTable(datas: Array<orderDTO>) {
  //   return Array.from(datas).forEach((data) => {
  //     this.addToOrderTable(data);
  //   });
  // }

  async createOrder(data: orderDTO) {
    const varorder = new order();
    varorder.user_id = data.user_id;
    varorder.order_quantity = data.order_quantity;
    varorder.order_orderdate = data.order_orderdate;
    varorder.order_pickupdate = data.order_pickupdate;
    varorder.order_id = (Date.now() % 100000) + data.user_id;
    // create order
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(varorder);
      const orderId = await queryRunner.manager.getId(varorder);
      await queryRunner.commitTransaction();
      data.order_products.forEach(async (order_poduct) => {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const varorder_product = new order_product();
        varorder_product.order_product_quantity =
          order_poduct.order_product_quantity;
        varorder_product.product_id = order_poduct.order_product_id;
        try {
          varorder_product.order_id = orderId;
          await queryRunner.manager.save(varorder_product);
          const order_productID = await queryRunner.manager.getId(
            varorder_product,
          );
          order_poduct.order_product_adjustitem.forEach(async (item) => {
            await queryRunner.manager.insert(order_product_adjustitem, {
              order_product_id: order_productID,
              adjustitem_id: item.adjustitem_id,
            });
          });
          await queryRunner.commitTransaction();
        } catch (e) {
          console.log(e);
          throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        } finally {
          await queryRunner.release();
        }
      });
    } catch (e) {
      console.log(e);
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    } finally {
      await queryRunner.release();
    }
  }

  async getOrder(user_id: number, order_id: number) {
    const flat = (obj, out) => {
      Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === 'object') {
          out = flat(obj[key], out); //recursively call for nesteds
        } else {
          out[key] = obj[key]; //direct assign for values
        }
      });
      return out;
    };
    const order = await this.order_Respository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.order_products', 'order_products')
      .leftJoinAndSelect('order_products.product', 'product')
      .leftJoinAndSelect(
        'order_products.order_product_adjustitem',
        'order_product_adjustitem',
      )
      .leftJoinAndSelect('order_product_adjustitem.adjustitem', 'adjustitem')
      .where('order.order_id = :order_id', { order_id: order_id })
      .andWhere('order.user_id = :user_id', { user_id: user_id })
      .getOne();

    let neworder: any[] | string;
    if (order) {
      neworder = order.order_products.map((product) => {
        const org_order_product_adjustitem = product.order_product_adjustitem;
        delete product.order_product_adjustitem;
        const newproduct = flat(product, {});

        delete newproduct.product_id;
        delete newproduct.product_image;
        org_order_product_adjustitem.forEach((item) => {
          delete item.order_product_adjustitem_id;
        });
        newproduct.order_product_adjustitem = org_order_product_adjustitem.map(
          (item) => flat(item, {}),
        );

        return newproduct;
      });
    } else {
      // neworder = '訂單編號：' + order_id + ' 不存在';
      // throw new NotFoundException('訂單編號：' + order_id + ' 不存在');
      throw new HttpException(
        '訂單編號：' + order_id + ' 不存在',
        HttpStatus.NOT_FOUND,
      );
    }

    return neworder;
  }

  async deleteOrder(user_id: number, order_id: number) {
    const res = await this.order_Respository.findOne({
      where: { user_id: user_id, order_id: order_id },
    });

    if (res !== undefined) {
      if (moment(res.order_pickupdate) < moment()) {
        throw new HttpException('訂單不可被刪除', HttpStatus.CONFLICT);
      } else {
        if (res) {
          await this.order_Respository.delete({
            user_id: user_id,
            order_id: order_id,
          });
          return {
            status: 200,
            message: '訂單已成功刪除',
          };
        }
      }
    }

    // throw new NotFoundException('訂單編號：' + order_id + ' 不存在');
    throw new HttpException(
      '訂單編號：' + order_id + ' 不存在',
      HttpStatus.NOT_FOUND,
    );
  }
}
