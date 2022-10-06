import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';

type db_type = 'mysql' | 'mariadb';

export const RPI_LOGConfig: TypeOrmModuleOptions = {
  name: 'RPI_LOG',
  type: 'mariadb',
  host: process.env.DB_host,
  port: Number(process.env.DB_port),
  username: process.env.DB_username,
  password: process.env.DB_password,
  database: process.env.DB_database,
  autoLoadEntities: true,
  synchronize: true,
};
export const onlinemenuConfig: TypeOrmModuleOptions = {
  name: 'onlinemenu',
  type: process.env.DB_type as db_type,
  host: process.env.DB_host,
  port: Number(process.env.DB_port),
  username: process.env.DB_username,
  password: process.env.DB_password,
  database: process.env.DB_onlinemenu_database,
  autoLoadEntities: true,
  synchronize: true,
};
