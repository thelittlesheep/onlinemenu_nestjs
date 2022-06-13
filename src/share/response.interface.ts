import { ApiProperty } from '@nestjs/swagger';

export interface IResponse {
  statusCode?: number;
  isSuccess?: boolean;
  message?: string;
}

export interface IResponseSuccess<T> extends IResponse {
  isSuccess: true;
  data?: T;
}

export class ResponseSuccess implements IResponseSuccess<any> {
  statusCode?: number;
  isSuccess: true;
  message?: string;
  data?: any;
  constructor(statusCode: number, message: string, data: any) {
    this.statusCode = statusCode;
    this.isSuccess = true;
    this.message = message;
    this.data = data;
  }

  static responseGenerator(message: string, data: any) {
    return { message: message, responseData: data };
  }
}

export enum errorType {
  BAD_REQUEST = '錯誤的請求',
  UNAUTHORIZED = '未經授權',
  FORBIDDEN = '禁止訪問',
  NOT_FOUND = '找不到資源',
  CONFLICT = '資源衝突',
  INTERNAL_SERVER_ERROR = '伺服器錯誤',
}

export interface IResponseError extends IResponse {
  isSuccess: false;
  error?: errorType;
}

export class ResponseError implements IResponseError {
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  message: string;
  @ApiProperty()
  error: errorType;
  @ApiProperty()
  isSuccess: false;
}

export function checkResponseErrorType(statusCode: number) {
  switch (statusCode) {
    case 400:
      return errorType.BAD_REQUEST;
    case 401:
      return errorType.UNAUTHORIZED;
    case 403:
      return errorType.FORBIDDEN;
    case 404:
      return errorType.NOT_FOUND;
    case 409:
      return errorType.CONFLICT;
    case 500:
      return errorType.INTERNAL_SERVER_ERROR;
  }
}
