import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Temp_data } from './Temp_data.entity';
import { RpiTempService } from './rpi-temp.service';
import { RpiTempController } from './rpi-temp.controller';

@Module({
  controllers: [RpiTempController],
  imports: [TypeOrmModule.forFeature([Temp_data])],
  providers: [RpiTempService],
})
export class RpiTempModule {}
