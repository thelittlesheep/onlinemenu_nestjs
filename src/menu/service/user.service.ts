import { Injectable } from '@nestjs/common';
import { user } from 'menu/entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(user, 'onlinemenu')
    private user_Respository: Repository<user>,
  ) {}

  async getuser() {
    const res = await this.user_Respository.find({
      join: {
        alias: 'user',
        leftJoinAndSelect: {
          order: 'user.orders',
        },
      },
    });
    return res;
  }

  async getuserbyQB() {
    const res = await this.user_Respository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.orders', 'orders')
      .leftJoinAndSelect('orders.products', 'products')
      .select(['user', 'orders', 'products'])
      .getMany();
    return res;
  }
}
