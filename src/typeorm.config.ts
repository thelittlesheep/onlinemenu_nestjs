import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';

export const RPI_LOGConfig: TypeOrmModuleOptions = {
  name: 'RPI_LOG',
  type: 'mariadb',
  host: process.env.DB_REMOTE_HOST,
  port: Number(process.env.DB_REMOTE_port),
  username: process.env.DB_REMOTE_username,
  password: process.env.DB_REMOTE_password,
  database: process.env.DB_REMOTE_rpi_database,
  autoLoadEntities: true,
  synchronize: true,
};
export const onlinemenuConfig: TypeOrmModuleOptions = {
  name: 'onlinemenu',
  type: 'mariadb',
  host: process.env.DB_REMOTE_HOST,
  port: Number(process.env.DB_REMOTE_port),
  username: process.env.DB_REMOTE_username,
  password: process.env.DB_REMOTE_password,
  database: process.env.DB_REMOTE_onlinemenu_database,
  autoLoadEntities: true,
  synchronize: true,
};
