import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Redirect,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { RpiTempDto } from './rpi-temp.dto';
import { RpiTempService } from './rpi-temp.service';
import { Temp_data } from './Temp_data.entity';
import { UpdateBodyDTO } from './updatebody.dto';

@Controller()
export class RpiTempController {
  constructor(private readonly Rpi_TempService: RpiTempService) {}

  @Get()
  gettemp() {
    return this.Rpi_TempService.getAll();
  }

  @Post()
  updatetempbybody(
    // @Res({ passthrough: true }) res: Response,
    @Res() res: Response,
    @Body() updatebody: UpdateBodyDTO,
  ) {
    const rawdate = updatebody._rawdatetime;
    const rawtemp = updatebody._rawtemp;
    const logtime: Date = new Date(Date.parse(rawdate));

    if (rawdate === undefined || rawtemp === undefined) {
      res.status(417).sendStatus(417);
    } else {
      const tempdata: RpiTempDto = {
        _logtime: logtime,
        _temp: rawtemp,
      };
      console.log(rawtemp);
      this.Rpi_TempService.createTempdata(tempdata);
      res.status(201).sendStatus(201);
    }
  }
}
