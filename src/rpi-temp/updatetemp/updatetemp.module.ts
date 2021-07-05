import { Module } from '@nestjs/common';
import { UpdatetempController } from './updatetemp.controller';
import { UpdatetempService } from './updatetemp.service';

@Module({
  imports: [],
  controllers: [UpdatetempController],
  providers: [UpdatetempService],
})
export class UpdatetempModule {}
