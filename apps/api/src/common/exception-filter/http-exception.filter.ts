import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Response } from 'express';
import { AppException } from '../exceptions/app.exception.js';
import { ERROR_STATUS_MAP } from '../exceptions/error-status.constant.js';
import type { ApiErrorResponse } from '@score-analytics/shared';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();

    if (exception instanceof AppException) {
      const statusCode =
        ERROR_STATUS_MAP[exception.code] ?? HttpStatus.INTERNAL_SERVER_ERROR;

      const body: ApiErrorResponse = {
        success: false,
        error: {
          code: exception.code,
          message: exception.message,
        },
      };

      response.status(statusCode).json(body);

      return;
    }

    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();

      response.status(statusCode).json({
        success: false,
        error: {
          code: 'HTTP_ERROR',
          message: exception.message,
        },
      });

      return;
    }

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Internal server error',
      },
    });
  }
}
