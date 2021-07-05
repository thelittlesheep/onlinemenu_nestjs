import { Module } from '@nestjs/common';
import { UsersModulev1 } from './Usersv1/users.module';
import { TasksController } from './tasks/tasks.controller';

@Module({
  controllers: [TasksController],
  imports: [UsersModulev1],
  providers: [],
})
export class Apiv1Module {}
