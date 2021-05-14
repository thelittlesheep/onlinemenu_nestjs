import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './DTO/create-users.dto';

@Injectable()
export class UsersService {
  users = [{ Name: 'Michael', Age: 25 }];

  addUser(user: CreateUserDTO) {
    console.log('姓名:', user._name, '年紀:', user._age);
  }
}
