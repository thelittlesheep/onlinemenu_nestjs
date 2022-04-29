import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { usercontroller } from './user.controler';
import { user } from './user.entity';
import { UserService } from './user.service';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { MenuModule } from 'menu/menu.module';

@Module({
  controllers: [usercontroller],
  imports: [TypeOrmModule.forFeature([user], 'onlinemenu'), MenuModule],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
