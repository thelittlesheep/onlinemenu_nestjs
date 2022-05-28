import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { usercontroller, userOrdercontroller } from './user.controler';
import { user } from './user.entity';
import { UserService } from './user.service';
import { MenuModule } from 'menu/menu.module';

@Module({
  controllers: [usercontroller, userOrdercontroller],
  imports: [TypeOrmModule.forFeature([user], 'onlinemenu'), MenuModule],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
