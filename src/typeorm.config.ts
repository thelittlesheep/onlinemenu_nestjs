import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mariadb',
  host: '111.185.180.110',
  port: 3306,
  username: 'root',
  password: 'Hm3416077',
  database: 'RPI_LOG',
  // entities: ['dist/src/**/*.entity{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: true,
};
