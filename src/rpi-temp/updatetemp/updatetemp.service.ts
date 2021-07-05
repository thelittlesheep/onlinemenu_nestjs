import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdatetempService {
  users = [
    { id: 1, Name: 'Michael', Age: 25 },
    { id: 2, Name: 'Mei', Age: 24 },
  ];
  getusers(): string {
    return 'Hello';
  }
}
