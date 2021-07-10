import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RpiTempDto } from './rpi-temp.dto';
import { Temp_data } from './Temp_data.entity';

@Injectable()
export class RpiTempService {
  constructor(
    @InjectRepository(Temp_data)
    private Temp_dataRespository: Repository<Temp_data>,
  ) {}

  getAll(): Promise<Temp_data[]> {
    return this.Temp_dataRespository.find({
      order: { id: 'DESC' },
      take: 10,
    });
  }

  createTempdata(tempdata: RpiTempDto): Promise<Temp_data> {
    const logtime = tempdata._logtime;
    const temp = tempdata._temp;
    const newTemp_data = this.Temp_dataRespository.create({ logtime, temp });
    return this.Temp_dataRespository.save(newTemp_data);
  }
}
