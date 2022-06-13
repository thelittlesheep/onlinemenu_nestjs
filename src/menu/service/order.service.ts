import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { order } from '@/menu/entity/order.entity';
import { order_product } from '@/menu/entity/order_product.entity';
import { order_product_adjustitem } from '@/menu/entity/order_product_adjustitem.entity';
import { Connection, Repository } from 'typeorm';
import { orderCreateDTO, orderInfoDTO } from '../DTO/order.DTO';
import * as moment from 'moment';
import { user } from '@/users/user.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectConnection('onlinemenu')
    private connection: Connection,
    @InjectRepository(order, 'onlinemenu')
    private order_Respository: Repository<order>,
    @InjectRepository(user, 'onlinemenu')
    private user_Respository: Repository<user>,
  ) {}

  async createUserOrder(data: orderCreateDTO) {
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

  async getUserOrder(user_id: number, order_id: number): Promise<orderInfoDTO> {
    const user = await this.user_Respository.findOne({
      join: {
        alias: 'user',
        leftJoinAndSelect: {
          order: 'user.orders',
          order_products: 'order.order_products',
          product: 'order_products.product',
        },
      },
      where: { user_id: user_id },
    });
    if (user !== undefined) {
      const targetOrder = user.orders.find((order) => {
        return order.order_id === Number(order_id);
      });
      if (targetOrder !== undefined) {
        user.orders.map(async (order) => {
          delete order.user_id;
          order.order_products = await this.getUserOrderProducts(
            user.user_id,
            order.order_id,
          );
        });
        return targetOrder;
      } else {
        throw new HttpException('查無此訂單', HttpStatus.NOT_FOUND);
      }
    }
    throw new HttpException('查無此使用者', HttpStatus.NOT_FOUND);
    // return user;
  }

  async getUserOrders(user_id: number): Promise<orderInfoDTO[]> {
    const user = await this.user_Respository.findOne({
      join: {
        alias: 'user',
        leftJoinAndSelect: {
          order: 'user.orders',
          order_products: 'order.order_products',
          product: 'order_products.product',
        },
      },
      where: { user_id: user_id },
    });
    if (user !== undefined) {
      await Promise.all(
        user.orders.map(async (order) => {
          delete order.user_id;
          order.order_products = await this.getUserOrderProducts(
            user.user_id,
            order.order_id,
          );
        }),
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { orders, ...rest } = user;

      return orders;
    }
    throw new HttpException('查無此使用者', HttpStatus.NOT_FOUND);
  }

  async deleteUserOrder(user_id: number, order_id: number): Promise<void> {
    const res = await this.order_Respository.findOne({
      where: { user_id: user_id, order_id: order_id },
    });

    if (res !== undefined) {
      if (moment(res.order_pickupdate) < moment()) {
        throw new HttpException(
          '訂單不可被刪除，因為現在時間已超過取餐時間',
          HttpStatus.CONFLICT,
        );
      } else {
        await this.order_Respository.delete({
          user_id: user_id,
          order_id: order_id,
        });
      }
    }

    // throw new NotFoundException('訂單編號：' + order_id + ' 不存在');
    throw new HttpException(
      '訂單編號：' + order_id + ' 不存在',
      HttpStatus.NOT_FOUND,
    );
  }

  // for getUserOrder and getUserOrders
  async getUserOrderProducts(
    user_id: number,
    order_id: number,
  ): Promise<order_product[]> {
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
      // .select('order')
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
}
