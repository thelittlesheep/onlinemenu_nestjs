import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RouterModule, Routes } from 'nest-router';
import { TypeOrmModule } from '@nestjs/typeorm';
import { onlinemenuConfig } from './typeorm.config';
import { AppGateway } from './app.gateway';
import { MenuModule } from './menu/menu.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { AuthenticatedGuard } from '@/auth/authenticaed.guard';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';

const routes: Routes = [
  {
    path: 'menu',
    module: MenuModule,
  },
  {
    path: 'users',
    module: UsersModule,
  },
];
@Module({
  imports: [
    RouterModule.forRoutes(routes),
    TypeOrmModule.forRoot(onlinemenuConfig),
    MenuModule,
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [configuration],
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppGateway,
    // 提供全域的AuthenticatedGuard驗證
    {
      provide: APP_GUARD,
      useFactory: (ref) => new AuthenticatedGuard(ref),
      inject: [Reflector],
    },
  ],
})
export class AppModule {}
