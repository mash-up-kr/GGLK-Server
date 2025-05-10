import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import type { Response } from 'express';
import { STATUS_CODES } from 'node:http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseException } from '../exception';

const PROGRAMMATIC_ERROR = 'PROGRAMMATIC_ERROR';

@Injectable()
export class GlobalResponseInterceptor implements NestInterceptor {
  /**
   *
   * Flow
   *
   * [On Success]
   * Interceptor -> Response
   *
   * [On Exception]
   * Exception -> Interceptor catchError -> ExceptionFilter
   */

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    function transformResponse(data: unknown) {
      const res = context.switchToHttp().getResponse<Response>();
      const statusCode = res.statusCode;

      return {
        statusCode,
        data,
      };
    }

    function handleError(error: unknown): Observable<never> {
      console.error(error);
      if (error instanceof BaseException) {
        return throwError(() => error);
      } else if (error instanceof HttpException) {
        return throwError(
          () =>
            new BaseException(
              error.getStatus(),
              error.message,
              STATUS_CODES[error.getStatus()],
            ),
        );
      } else {
        return throwError(
          () =>
            new BaseException(
              500,
              (error as Error)?.message ?? 'Programmatic Error',
              PROGRAMMATIC_ERROR,
            ),
        );
      }
    }

    return next.handle().pipe(map(transformResponse), catchError(handleError));
  }
}
