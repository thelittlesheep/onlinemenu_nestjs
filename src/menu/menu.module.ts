import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';

import { menuEntities } from './entity';
import { menuSerivces } from './service';
import { menuController } from './controler';
import { AbilityModule } from 'ability/ability.module';

@Module({
  controllers: [MenuController, ...menuController],
  // 在entity目錄下新增index.ts，把相關的entity export陣列方便管理
  imports: [
    TypeOrmModule.forFeature([...menuEntities], 'onlinemenu'),
    AbilityModule,
  ],
  providers: [MenuService, ...menuSerivces],
  exports: [MenuService, ...menuSerivces],
})
export class MenuModule {}
