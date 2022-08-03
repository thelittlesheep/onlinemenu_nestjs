import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IResponseSuccess, ResponseSuccess } from './response.interface';
import { Request, Response } from 'express';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, IResponseSuccess<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IResponseSuccess<T>> {
    // const response = context.switchToHttp().getResponse<Response>();
    // const request = context.switchToHttp().getRequest<Request>();
    const statusCode = context
      .switchToHttp()
      .getResponse<Response>().statusCode;
    return next.handle().pipe(
      map((data) => {
        return new ResponseSuccess(statusCode, data.message, data.responseData);
      }),
    );
  }
}
