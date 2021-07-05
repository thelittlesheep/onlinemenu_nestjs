import {
  Controller,
  Get,
  Post,
  Request,
  Response,
  HttpStatus,
} from '@nestjs/common';

import { UpdatetempService } from './updatetemp.service';

@Controller()
export class UpdatetempController {
  constructor(private readonly UpdatetempService: UpdatetempService) {}

  @Get()
  updatetemp() {
    return this.UpdatetempService.getusers();
  }
}
