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
import userInfoDTO from './DTO/userInfo.DTO';
import { Store } from 'express-session';
import { RedisClient } from 'redis';
import { ISession } from '@/custom.interface';
import { json } from 'stream/consumers';

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
    @Inject(CACHE_MANAGER)
    private cacheManager: RedisCache,
  ) {
    this.redisClient = this.cacheManager.store.getClient();
  }

  async findUserByAccount(user_account: string) {
    return this.user_Respository.findOne({
      where: { user_account: user_account },
    });
  }

  async findUserByID(user_id: number) {
    return this.user_Respository.findOne({
      where: { user_id: user_id },
    });
  }

  async getAllUser() {
    const user = await this.user_Respository.find();
    return user;
  }

  async createUser(data: userDTO) {
    const varuser = new user();
    varuser.user_account = data.user_account;
    varuser.user_password = data.user_password;
    varuser.user_name = data.user_name;
    varuser.user_email = data.user_email;
    varuser.user_phone = data.user_phone;
    varuser.user_age = data.user_age;

    const dbuser = await this.findUserByAccount(data.user_account);

    if (dbuser !== undefined) {
      throw new HttpException('帳號已存在', HttpStatus.CONFLICT);
    }
    // 若使用者不存在，則新增使用者，並同時取得使用者的user_id
    const user_id = (await this.user_Respository.save(varuser)).user_id;
    // 如果新增之使用者沒有提供user_name，則在新增使用者後，更新其user_name為 "User{user_id}"
    if (data.user_name === undefined) {
      await this.user_Respository.update(
        { user_id: user_id }, // where condition
        { user_name: `User${user_id}` }, // update data
      );
    }

    return { user_id: user_id };
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { user_account, user_password, ...rest } =
          await this.findUserByID(user_id);
        // session Object中包含 {cookie:{}, passport:{user:{}} }
        session.passport.user = rest;
      }

      return updateItems;
    } else {
      throw new HttpException('資料未變動', HttpStatus.OK);
    }
  }

  // async getUserOrders(user_id: number) {
  //   const user = await this.user_Respository.findOne({
  //     where: { user_id: user_id },
  //     relations: ['orders'],
  //   });
  //   if (user) {
  //     return user.orders;
  //   }
  //   throw new HttpException('查無此使用者', HttpStatus.NOT_FOUND);
  // }

  // async getuserbyQueryBuilder() {
  //   const user = await this.user_Respository
  //     .createQueryBuilder('user')
  //     .leftJoinAndSelect('user.orders', 'orders')
  //     .leftJoinAndSelect('orders.products', 'products')
  //     .select(['user', 'orders', 'products'])
  //     .getOne();

  //   return user;
  // }

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
