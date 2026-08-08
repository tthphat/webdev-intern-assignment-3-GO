import { ValidationErrorDetail } from '@score-analytics/shared';

export interface AppExceptionOptions {
  code: string;
  message: string;
  details?: ValidationErrorDetail[];
}

export class AppException extends Error {
  readonly code: string;
  readonly details?: ValidationErrorDetail[];

  constructor(options: AppExceptionOptions) {
    super(options.message);

    this.name = 'AppException';
    this.code = options.code;
    this.details = options.details;
  }
}
