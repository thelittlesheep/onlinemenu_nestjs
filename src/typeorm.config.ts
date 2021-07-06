import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mariadb',
  host: '172.18.0.3',
  port: 3306,
  username: 'root',
  password: 'Hm3416077',
  database: 'RPI_LOG',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};
