import { HttpStatus } from '@nestjs/common';
import { ERROR_CODES } from '@score-analytics/shared';

export const ERROR_STATUS_MAP: Record<string, HttpStatus> = {
  [ERROR_CODES.CANDIDATE_NOT_FOUND]: HttpStatus.NOT_FOUND,
  [ERROR_CODES.VALIDATION_ERROR]: HttpStatus.BAD_REQUEST,
  [ERROR_CODES.INTERNAL_SERVER_ERROR]: HttpStatus.INTERNAL_SERVER_ERROR,
};
