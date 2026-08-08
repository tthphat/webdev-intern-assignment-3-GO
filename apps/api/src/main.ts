import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ApiResponseInterceptor } from '../common/interceptors/api-response.interceptor.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new ApiResponseInterceptor());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
