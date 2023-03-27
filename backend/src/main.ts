import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // create app
  const app = await NestFactory.create(AppModule);

  // api prefix
  app.setGlobalPrefix('api');

  // cors
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // run
  await app.listen(8000);
}
bootstrap();
