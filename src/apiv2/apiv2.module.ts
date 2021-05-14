import { Module } from '@nestjs/common';
import { UsersModulev2 } from './Usersv2/users.module';
import { TasksController } from './tasks/tasks.controller';

@Module({
  imports: [UsersModulev2],
  controllers: [TasksController],
  providers: [],
})
export class Apiv2Module {}
