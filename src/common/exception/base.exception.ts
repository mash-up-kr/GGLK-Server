import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseException extends HttpException {
  constructor(status: number, message: string, errorCode?: string) {
    super(
      {
        statusCode: status,
        errorCode: errorCode ?? HttpStatus[status],
        message,
        timestamp: new Date().toISOString(),
      },
      status,
    );

    Error.captureStackTrace(this, new.target);
  }
}
