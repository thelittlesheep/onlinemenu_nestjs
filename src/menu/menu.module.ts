import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';

import { product } from './entity/product.entity';
import { prodtype } from './entity/prodtype.entity';
import { prodtype_adjustitem } from './entity/prodtype_adjustitem.entity';
import { adjustitem } from './entity/adjustitem.entity';
// import { ProductsService } from './service/products.service';
// import { ProductTypesService } from './service/types.service';

@Module({
  controllers: [MenuController],
  imports: [
    TypeOrmModule.forFeature(
      [product, prodtype, prodtype_adjustitem, adjustitem],
      'onlinemenu',
    ),
  ],
  providers: [MenuService],
})
export class MenuModule {}
