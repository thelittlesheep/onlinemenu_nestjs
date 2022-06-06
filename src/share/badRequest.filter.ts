import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';

export class classvalidatorError {
  error: string;
  message: string[];
  statusCode: number;
}

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const otherexception = exception.getResponse();
    let errormsg: string;
    if (otherexception instanceof Object) {
      errormsg = (otherexception as classvalidatorError).message[0];
    } else {
      errormsg = otherexception;
    }
    response
      .status(status)
      // you can manipulate the response here
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: errormsg,
      });
  }
}
