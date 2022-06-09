import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { user } from './user.entity';
import { userDTO } from './DTO/user.DTO';
import { OrderService } from '@/menu/service/order.service';
import { IuserResponseDto } from './DTO/userResponse.DTO';
import userInfoDTO from './DTO/userInfo.DTO';
import { Store } from 'express-session';
import { RedisClient } from 'redis';
import { ISession } from '@/custom.interface';

interface RedisCache extends Cache {
  store: RedisStore;
}
interface RedisStore extends Store {
  name: 'redis';
  getClient: () => RedisClient;
  isCacheableValue: (value: any) => boolean;
}

@Injectable()
export class UserService {
  private redisClient: RedisClient;
  constructor(
    @InjectRepository(user, 'onlinemenu')
    private user_Respository: Repository<user>,
    private order_Service: OrderService,
    @Inject(CACHE_MANAGER)
    private cacheManager: RedisCache,
  ) {
    this.redisClient = this.cacheManager.store.getClient();
  }
  async findUser(user_account: string) {
    return this.user_Respository.findOne({
      where: { user_account: user_account },
    });
  }

  async findUserByID(user_id: number) {
    return this.user_Respository.findOne({
      where: { user_id: user_id },
    });
  }

  async createUser(data: userDTO) {
    const varuser = new user();
    varuser.user_account = data.user_account;
    varuser.user_password = data.user_password;
    varuser.user_name = data.user_name;
    varuser.user_email = data.user_email;
    varuser.user_phone = data.user_phone;
    varuser.user_age = data.user_age;

    const dbuser = await this.findUser(data.user_account);

    if (dbuser) {
      throw new HttpException('帳號已存在', HttpStatus.CONFLICT);
    }

    const user_id = (await this.user_Respository.save(varuser)).user_id;
    if (data.user_name === undefined) {
      await this.user_Respository.update(
        { user_id: user_id }, // where condition
        { user_name: `User${user_id}` }, // update data
      );
    }

    return { statusCode: 201, message: '成功建立帳號' };
  }
  async getAllUser() {
    const user = await this.user_Respository.find();
    return user;
  }

  async updateUser(
    user_id: number,
    newUser: userInfoDTO,
    session: ISession<userInfoDTO>,
  ) {
    const dbUser = await this.user_Respository.findOne({
      where: { user_id: user_id },
    });
    const updateItems = [];
    const updateUser = new userInfoDTO();
    Object.keys(dbUser).forEach((i) => {
      if (Object.keys(newUser).includes(i)) {
        updateUser[i] = newUser[i];
        updateItems.push(i);
      } else {
        updateUser[i] = dbUser[i];
      }
    });
    // 確認傳入之資料與資料庫中的資料是否相同，若相同則不更新\
    const isUpdateisSame =
      updateItems.filter((i) => dbUser[i] !== updateUser[i]).length === 0
        ? true
        : false;
    if (isUpdateisSame === false) {
      const res = await this.user_Respository.update(user_id, updateUser);
      // 若資料庫更新成功，則一併更新session
      if (res.affected !== 0) {
        const { user_account, user_password, ...rest } =
          await this.findUserByID(user_id);
        // session Object中包含 {cookie:{}, passport:{user:{}} }
        session.passport.user = rest;
      }

      return {
        statusCode: 200,
        message: `成功更新使用者資訊`,
      };
    } else {
      throw new HttpException('資料未變動', HttpStatus.OK);
    }
  }

  async getOrders(user_id: number) {
    const user = await this.user_Respository.findOne({
      where: { user_id: user_id },
      relations: ['orders'],
    });
    if (user) {
      return user.orders;
    }
    throw new HttpException('查無此使用者', HttpStatus.NOT_FOUND);
  }

  async getUserInfoandOrders(user_id: number) {
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
    throw new HttpException('查無此使用者', HttpStatus.NOT_FOUND);
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

  // async getCacheUser(req: iRequest, session: ISession<userInfoDTO>) {
  //   console.log(req.session);
  //   console.log(session.passport);
  //   // 從reddis中利用session key取得使用者資訊
  //   this.redisClient.get('sess:' + session.id, (err, res) => {
  //     console.log(err, JSON.parse(res));
  //   });
  //   return session.passport;
  // }
}
