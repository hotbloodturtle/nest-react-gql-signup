import { NestFactory } from '@nestjs/core';
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

  // run
  await app.listen(8000);
}
bootstrap();
