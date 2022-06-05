import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { usercontroller, userOrdercontroller } from './user.controler';
import { user } from './user.entity';
import { UserService } from './user.service';
import { MenuModule } from 'menu/menu.module';
import type { ClientOpts } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule } from '@nestjs/common';
import { AbilityModule } from 'ability/ability.module';

@Module({
  controllers: [usercontroller, userOrdercontroller],
  imports: [
    TypeOrmModule.forFeature([user], 'onlinemenu'),
    MenuModule,
    AbilityModule,
    CacheModule.register<ClientOpts>({
      store: redisStore,
      host: 'onlinemenu_redis',
      port: 6379,
      max: 50,
    }),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
