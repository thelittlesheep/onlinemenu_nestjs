import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TempData } from './entity/Temp_data.entity';
import { RpiTempService } from './rpi-temp.service';
import { RpiTempController } from './rpi-temp.controller';

@Module({
  controllers: [RpiTempController],
  imports: [TypeOrmModule.forFeature([TempData])],
  providers: [RpiTempService],
})
export class RpiTempModule {}
