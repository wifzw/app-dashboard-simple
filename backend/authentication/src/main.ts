import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: ['*'],
    },
  });

  app.enableCors(); // Enable CORS APP_APP_URL

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const firstError = errors[0];

        if (!!errors.length && firstError) {
          const error = Object.values(firstError.constraints).join(', ');
          const ERROR_FILTER_ID = error.includes(',')
            ? error.split(',')[0]
            : error;
          const result = { ERROR_ID: ERROR_FILTER_ID };

          return new BadRequestException(result);
        }
      },
    }),
  );
  app.setGlobalPrefix('api/v1');

  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();
