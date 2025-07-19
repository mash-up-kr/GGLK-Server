import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { STATUS_CODES } from 'node:http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserPayload } from '@gglk/auth/auth.interface';
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
    const logger = new Logger('GGLK Server');

    const parseMetadatas = function (req: Request, res: Response) {
      // Context Metadatas
      const statusCode = res.statusCode;

      // Request
      const user = req?.user as UserPayload;
      const ip = req?.ip;
      const method = req?.method;
      const originUrl = req?.originalUrl;

      return {
        statusCode,
        user,
        ip,
        method,
        originUrl,
      };
    };

    const doLogging = function (
      statusCode: number,
      ip?: string,
      method?: string,
      originUrl?: string,
      user?: UserPayload,
    ) {
      const now = new Date();
      const userName = user ? user.id : 'Anonymous';
      const logMessage = `${now.toISOString()}--- ${userName} (${ip ?? 'IP Unknown'}) --- [${statusCode}] ${method} ${originUrl}`;
      if (statusCode >= 200 && statusCode < 400) {
        logger.log(logMessage);
      } else if (statusCode >= 400 && statusCode < 500) {
        logger.warn(logMessage);
      } else {
        logger.error(logMessage);
      }
    };

    function transformResponse(data: unknown) {
      // Context
      const req = context.switchToHttp().getRequest<Request>();
      const res = context.switchToHttp().getResponse<Response>();

      // Parse Metadata and log
      const { statusCode, user, ip, method, originUrl } = parseMetadatas(
        req,
        res,
      );
      doLogging(statusCode, ip, method, originUrl, user);

      return {
        statusCode,
        data,
      };
    }

    function handleError(error: unknown): Observable<never> {
      // Context
      const req = context.switchToHttp().getRequest<Request>();
      const res = context.switchToHttp().getResponse<Response>();

      // Parse Metadata and log
      const { user, ip, method, originUrl } = parseMetadatas(req, res);
      const exceptionStatusCode =
        error instanceof HttpException ? error.getStatus() : 500;
      doLogging(exceptionStatusCode, ip, method, originUrl, user);
      logger.error(error);

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
