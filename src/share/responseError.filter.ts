import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { checkResponseErrorType, IResponseError } from './response.interface';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const message = exception.message;
    const timestamp = new Date().toISOString();

    const responseObject: IResponseError = {
      statusCode: status,
      isSuccess: false,
      message: message,
      error: checkResponseErrorType(status),
    };
    response.status(status).json(responseObject);
  }
}
