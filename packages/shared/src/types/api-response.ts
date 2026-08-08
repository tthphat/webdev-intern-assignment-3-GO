export type ApiSuccessResponse<T> = {
  success: true;
  message: string;
  data: T;
};

export type ValidationErrorDetail = {
  field: string;
  message: string;
};

export type ApiErrorResponse = {
  success: false;
  error: {
    code: string;
    message: string;
    details?: ValidationErrorDetail[];
  };
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
