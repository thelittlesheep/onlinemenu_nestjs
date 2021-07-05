import { Module } from '@nestjs/common';
import { UpdatetempController } from './updatetemp/updatetemp.controller';
import { UpdatetempModule } from './updatetemp/updatetemp.module';

@Module({
  controllers: [],
  imports: [UpdatetempModule],
  providers: [],
})
export class RpiTempModule {}
