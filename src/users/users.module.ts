import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController, UserOrderController } from './user.controller';
import { user } from './user.entity';
import { UserService } from './user.service';
import type { ClientOpts } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule } from '@nestjs/common';
import { AbilityModule } from '@/ability/ability.module';
import { MenuModule } from '@/menu/menu.module';

@Module({
  controllers: [UserController, UserOrderController],
  imports: [
    TypeOrmModule.forFeature([user], 'onlinemenu'),
    AbilityModule,
    // 避免recursive dependency injection
    // 在兩個或多個相互使用的Module都要import一次
    forwardRef(() => MenuModule),
    CacheModule.register<ClientOpts>({
      store: redisStore,
      host: process.env.redis_host,
      port: Number(process.env.redis_port),
      max: 50,
    }),
  ],
  providers: [UserService],
  // 因為要在兩個或多個Module中使用UserRepository，所以要export TypeOrmModule
  exports: [UserService, TypeOrmModule],
})
export class UsersModule {}
