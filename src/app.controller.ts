import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // async findAll() {
  //   throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
  // }
}
