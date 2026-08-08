import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { ApiSuccessResponse } from '@score-analytics/shared';
import { map, Observable } from 'rxjs';

export type ApiSuccessPayload<T> = {
  message: string;
  data: T;
};

export class ApiResponseInterceptor<T> implements NestInterceptor<
  ApiSuccessPayload<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<ApiSuccessPayload<T>>,
  ): Observable<ApiSuccessResponse<T>> {
    return next.handle().pipe(
      map((response) => ({
        success: true,
        message: response.message,
        data: response.data,
      })),
    );
  }
}
