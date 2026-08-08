import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ApiResponseInterceptor } from './common/interceptors/api-response.interceptor.js';
import { HttpExceptionFilter } from './common/exception-filter/http-exception.filter.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new ApiResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
