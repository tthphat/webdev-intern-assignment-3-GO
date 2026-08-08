import { HttpStatus, Injectable, Logger, PipeTransform } from '@nestjs/common';
import { ERROR_CODES } from '@score-analytics/shared';
import { ZodType } from 'zod';
import { AppException } from '../exceptions/app.exception.js';

@Injectable()
export class ZodValidationPipe<T> implements PipeTransform {
  private readonly logger = new Logger(ZodValidationPipe.name);
  constructor(private readonly schema: ZodType<T>) {}

  transform(value: unknown): T {
    this.logger.log('ZodValidationPipe is running');

    const result = this.schema.safeParse(value);

    if (!result.success) {
      const details = result.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));

      throw new AppException({
        code: ERROR_CODES.VALIDATION_ERROR,
        message: 'Validation failed',
        // details,
      });
    }

    return result.data;
  }
}
