import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { Products } from 'menu/entity/products.entity';
// import { TempData } from 'rpi-temp/entity/Temp_data.entity';

export const RPI_LOGConfig: TypeOrmModuleOptions = {
  type: 'mariadb',
  host: 'db.lshuang.tw',
  port: 3306,
  username: 'root',
  password: 'Hm3416077',
  database: 'RPI_LOG',
  // entities: [TempData],
  autoLoadEntities: true,
  synchronize: true,
};
export const onlinemenuConfig: TypeOrmModuleOptions = {
  name: 'onlinemenu',
  type: 'mariadb',
  host: 'db.lshuang.tw',
  port: 3306,
  username: 'root',
  password: 'Hm3416077',
  database: 'onlinemenu',
  // entities: [Products],
  autoLoadEntities: true,
  synchronize: true,
};
