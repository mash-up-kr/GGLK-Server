import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import type { Response } from 'express';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseException } from '../exception';

const PROGRAMMATIC_ERROR = 'PROGRAMMATIC_ERROR';

@Injectable()
export class GlobalResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: unknown) => {
        const res = context.switchToHttp().getResponse<Response>();
        const statusCode = res.statusCode;

        return {
          statusCode: statusCode,
          data: data,
        };
      }),
      catchError((error) => {
        if (error instanceof BaseException) {
          return throwError(() => error);
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
      }),
    );
  }
}
