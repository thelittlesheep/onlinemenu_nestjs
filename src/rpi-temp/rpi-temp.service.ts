import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RpiTempDto } from './dto/rpi-temp.dto';
import { TempData } from './entity/Temp_data.entity';
import { spacecalspd } from './dto/spacecalspd';
import { resolve } from 'path';
import { rejects } from 'assert';

@Injectable()
export class RpiTempService {
  constructor(
    @InjectRepository(TempData)
    private TempData_Respository: Repository<TempData>, // @InjectRepository(spacecalspd) // private spacecalspd_Respository: Repository<spacecalspd>,
  ) {}

  getAll(): Promise<TempData[]> {
    return this.TempData_Respository.find({
      order: { id: 'DESC' },
      take: 10,
    });
  }

  async execStorageProcedure(param?: string) {
    // const querystr = `CALL TESTPD`;
    const dbres: Promise<any> = this.TempData_Respository.query(
      'CALL db_spd()',
      // [param],
    );
    const newdata: spacecalspd[] = [];

    await dbres.then((rawdata) => {
      if (rawdata) {
        for (const singleTempData of rawdata[0]) {
          const name: string = singleTempData.name;
          const sizeInMB = Number(singleTempData.sizeInMB);
          newdata.push({
            name: name,
            sizeInMB: sizeInMB,
          });
        }
        // console.log(newdata);
      }
    });
    return newdata;
  }

  createTempdata(tempdata: RpiTempDto): Promise<TempData> {
    const logtime = tempdata._logtime;
    const temp = tempdata._temp;
    const newTemp_data = this.TempData_Respository.create({ logtime, temp });
    return this.TempData_Respository.save(newTemp_data);
  }
}
