import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { user } from './user.entity';
import { userDTO } from './userDTO';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(user, 'onlinemenu')
    private user_Respository: Repository<user>,
  ) {}

  async adduser(data: userDTO) {
    const varuser = new user();
    varuser.user_account = data.user_account;
    varuser.user_password = data.user_password;
    varuser.user_name = data.user_name;
    varuser.user_email = data.user_email;
    varuser.user_phone = data.user_phone;
    varuser.user_age = data.user_age;

    // const id = await this.user_Respository.getId(varuser);
    // console.log(id);

    return await this.user_Respository.save(varuser);
  }

  async getUserOrdersById(id) {
    const res = await this.user_Respository.findOne({
      join: {
        alias: 'user',
        leftJoinAndSelect: {
          order: 'user.orders',
          order_products: 'order.order_products',
          product: 'order_products.product',
        },
      },
      where: { user_id: id },
    });
    return res;
  }

  async getuserbyQueryBuilder() {
    const res = await this.user_Respository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.orders', 'orders')
      .leftJoinAndSelect('orders.products', 'products')
      .select(['user', 'orders', 'products'])
      .getOne();
    return res;
  }

  async finduser(user_account) {
    return this.user_Respository.findOne({
      where: { user_account: user_account },
    });
  }
}
