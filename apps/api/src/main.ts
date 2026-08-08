import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ApiResponseInterceptor } from './common/interceptors/api-response.interceptor.js';
import { HttpExceptionFilter } from './common/exception-filter/http-exception.filter.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOrigins = (
    process.env.CORS_ORIGINS ?? 'http://localhost:3000,http://localhost:5173'
  )
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  app.enableCors({
    origin: corsOrigins,
    credentials: true,
  });

  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new ApiResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
