import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Redirect,
  Res,
} from '@nestjs/common';
import { json, Response } from 'express';
import { RpiTempDto } from './dto/rpi-temp.dto';
import { RpiTempService } from './rpi-temp.service';
import { UpdateBodyDTO } from './dto/updatebody.dto';
import { spacecalspd } from './dto/spacecalspd';

@Controller()
export class RpiTempController {
  constructor(private readonly Rpi_TempService: RpiTempService) {}

  @Get()
  gettemp() {
    // const data = this.Rpi_TempService.getAll();
    // data.then((d) =>
    //   d.forEach((el) => {
    //     console.log(el.logtime);
    //   }),
    // );
    return this.Rpi_TempService.getAll();
  }

  // @Get('/callspd/:dbname')
  @Get('/callspd')
  async callspd(@Param() param): Promise<any[]> {
    const res = this.Rpi_TempService.execStorageProcedure(param.name);
    return res;
    // return param.dbname;
  }

  @Post()
  updatetempbybody(
    // @Res({ passthrough: true }) res: Response,
    @Res() res: Response,
    @Body() updatebody: UpdateBodyDTO,
  ) {
    const rawdatetime = updatebody._rawdatetime;
    const rawtemp = updatebody._rawtemp;
    // const datetimeInms: number | typeof NaN = Date.parse(rawdatetime);
    let logtime: Date;

    function isValidDate(d: number): boolean {
      const result: boolean = isNaN(d);
      return !result;
    }

    if (
      // !isValidDate(datetimeInms) ||
      rawdatetime === undefined ||
      rawtemp === undefined
    ) {
      res.status(417).sendStatus(417);
    } else {
      // logtime = new Date(datetimeInms);
      logtime = new Date(Date.parse(rawdatetime));
      // console.log(rawdatetime);
      // console.log(logtime);
      const tempdata: RpiTempDto = {
        _logtime: logtime,
        _temp: rawtemp,
      };
      this.Rpi_TempService.createTempdata(tempdata);
      res.status(201).sendStatus(201);
    }
  }
}
