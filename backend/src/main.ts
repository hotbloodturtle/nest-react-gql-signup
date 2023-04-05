import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  // create app
  const app = await NestFactory.create(AppModule);

  // api prefix
  app.setGlobalPrefix('api');

  // cors
  app.enableCors({
    methods: ['POST'],
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200,
  });

  // cookie
  app.use(cookieParser());

  // run
  await app.listen(8000);
}
bootstrap();
