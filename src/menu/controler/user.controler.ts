import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiParam } from '@nestjs/swagger';
import { UserService } from '../service/user.service';

import { userDTO } from '../DTO/userDTO';
import { apiResponseDto } from '../apiresponse/index';

@Controller('user')
export class usercontroller {
  constructor(protected user_Service: UserService) {}

  @Post()
  create(@Body() userDTO: userDTO) {
    console.log(userDTO);

    return this.user_Service.adduser(userDTO);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    example: '1',
    description:
      "Query an product basic profile by it's id. It will return an array.",
  })
  read(@Param('id') id) {
    return this.user_Service.getUserById(id);
  }

  // @Get('getuserbyQB')
  // getuser() {
  //   return this.user_Service.getuserbyQueryBuilder();
  // }
}
