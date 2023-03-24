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
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
