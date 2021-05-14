import {
  Controller,
  Get,
  Post,
  Request,
  Response,
  Param,
  Next,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './DTO/create-users.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers(@Request() req, @Response() res, @Next() next) {
    const users = [{ Name: 'Michael', Age: 25 }];
    // return users;
    res.status(HttpStatus.OK).json(users);
  }
  @Get('/:id')
  getUser(@Param() params) {
    return { getUser: params.id };
  }
  @Post()
  addUser(@Body() createUserDTO: CreateUserDTO) {
    this.usersService.addUser(createUserDTO);
  }
}
