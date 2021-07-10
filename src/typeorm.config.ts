import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mariadb',
  host: '192.168.0.198',
  port: 3306,
  username: 'root',
  password: 'Hm3416077',
  database: 'RPI_LOG',
  // entities: ['dist/src/**/*.entity{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: true,
};
