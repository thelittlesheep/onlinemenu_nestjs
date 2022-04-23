import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { user } from '../entity/user.entity';
import { userDTO } from '../DTO/userDTO';

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

  async getUserById(id) {
    const res = await this.user_Respository.find({
      join: {
        alias: 'user',
        leftJoinAndSelect: {
          order: 'user.orders',
          order_product: 'order.Order_Product',
          product: 'order_product.products',
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
      .getMany();
    return res;
  }
}
