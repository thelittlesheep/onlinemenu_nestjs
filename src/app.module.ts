import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RouterModule, Routes } from 'nest-router';

import { UsersModulev1 } from './apiv1/Usersv1/users.module';
import { UsersModulev2 } from './apiv2/Usersv2/users.module';
import { Apiv1Module } from './apiv1/apiv1.module';
import { Apiv2Module } from './apiv2/apiv2.module';

import { RpiTempModule } from './rpi-temp/rpi-temp.module';
import { UpdatetempModule } from './rpi-temp/updatetemp/updatetemp.module';

const routes: Routes = [
  // {
  //   path: 'v1',
  //   module: Apiv1Module,
  //   children: [{ path: 'users', module: UsersModulev1 }],
  // },
  // {
  //   path: 'v2',
  //   module: Apiv2Module,
  //   children: [{ path: 'users', module: UsersModulev2 }],
  // },
  {
    path: 'rpi_temp',
    module: RpiTempModule,
    children: [{ path: 'updatetemp', module: UpdatetempModule }],
  },
];
@Module({
  imports: [
    RouterModule.forRoutes(routes),
    // Apiv1Module,
    // Apiv2Module,
    RpiTempModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
