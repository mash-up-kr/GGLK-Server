import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { SentryExceptionCaptured } from '@sentry/nestjs';
import { Response } from 'express';
import { BaseException } from '../exception';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  @SentryExceptionCaptured()
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    if (exception instanceof BaseException) {
      return response.status(status).json(exception.getResponse());
    }
    const structedResponse = new BaseException(
      status,
      exception.message,
      exception.name,
    );
    return response.status(status).json(structedResponse.getResponse());
  }
}
