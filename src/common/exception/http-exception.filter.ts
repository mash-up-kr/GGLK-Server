import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { BaseException } from './base.exception';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    if (exception instanceof BaseException) {
      response.status(status).json(exception.getResponse());
    } else {
      new BaseException(
        status,
        exception.message,
        exception.name,
      ).getResponse();
    }
  }
}
