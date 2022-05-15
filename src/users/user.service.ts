import { HttpCode, HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { user } from './user.entity';
import { userDTO } from './user.DTO';
import { OrderService } from 'menu/service/order.service';
import { order_product } from 'menu/entity/order_product.entity';
import { IuserResponseDto } from './userResponse.DTO';
import { orderDTO } from 'menu/DTO/orderDTO';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(user, 'onlinemenu')
    private user_Respository: Repository<user>,
    private order_Service: OrderService,
  ) {}

  async adduser(data: userDTO) {
    const varuser = new user();
    varuser.user_account = data.user_account;
    varuser.user_password = data.user_password;
    varuser.user_name = data.user_name;
    varuser.user_email = data.user_email;
    varuser.user_phone = data.user_phone;
    varuser.user_age = data.user_age;

    const dbuser = await this.finduser(data.user_account);

    if (dbuser) {
      throw new HttpException('帳號已存在', 409);
    }

    const user_id = (await this.user_Respository.save(varuser)).user_id;
    if (!data.user_name) {
      await this.user_Respository.update(
        { user_id: user_id }, // where condition
        { user_name: `User${user_id}` }, // update data
      );
    }

    return { statusCode: 201, message: '成功建立帳號' };
  }

  async getUserOrders(user_id: number) {
    let newuser: IuserResponseDto = {};

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
    if (user) {
      newuser = { orders: user.orders };

      await Promise.all(
        newuser.orders.map(async (order) => {
          delete order.user_id;
          order.order_products = await this.order_Service.getOrder(
            user.user_id,
            order.order_id,
          );
        }),
      );

      return newuser;
    }
    throw new HttpException('查無此使用者', 404);
  }

  async getuserbyQueryBuilder() {
    const user = await this.user_Respository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.orders', 'orders')
      .leftJoinAndSelect('orders.products', 'products')
      .select(['user', 'orders', 'products'])
      .getOne();

    return user;
  }

  async finduser(user_account) {
    return this.user_Respository.findOne({
      where: { user_account: user_account },
    });
  }
}
