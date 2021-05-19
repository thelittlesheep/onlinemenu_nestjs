import { Module } from '@nestjs/common';
import { UsersModulev1 } from './apiv1/Usersv1/users.module';
import { UsersModulev2 } from './apiv2/Usersv2/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Apiv1Module } from './apiv1/apiv1.module';
import { Apiv2Module } from './apiv2/apiv2.module';
import { RouterModule, Routes } from 'nest-router';

const routes: Routes = [
  {
    path: 'v1',
    module: Apiv1Module,
    children: [{ path: 'users', module: UsersModulev1 }],
  },
  {
    path: 'v2',
    module: Apiv2Module,
    children: [{ path: 'users', module: UsersModulev2 }],
  },
];
@Module({
  imports: [RouterModule.forRoutes(routes), Apiv1Module, Apiv2Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
