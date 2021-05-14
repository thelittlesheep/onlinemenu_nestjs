import { Module } from '@nestjs/common';
import { UsersModulev1 } from './Usersv1/users.module';
import { TasksController } from './tasks/tasks.controller';

@Module({
  imports: [UsersModulev1],
  controllers: [TasksController],
  providers: [],
})
export class Apiv1Module {}
