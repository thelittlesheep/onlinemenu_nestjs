import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LoaclStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'meimeimei',
      signOptions: { expiresIn: '1day' },
    }),
  ],
  providers: [AuthService, LoaclStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
