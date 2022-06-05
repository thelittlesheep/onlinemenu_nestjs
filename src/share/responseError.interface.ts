import { ApiProperty } from '@nestjs/swagger';

export interface IResponseError {
  statusCode?: number;
  message?: string;
  error?: string;
}

export class ResponseError implements IResponseError {
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  message: string;
  @ApiProperty()
  error: string;
}
