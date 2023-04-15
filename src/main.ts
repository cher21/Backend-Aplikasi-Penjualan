import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { RolesGuard } from './login/tokenGuard';
import { Reflector } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  // const reflector = app.get(Reflector);
  // app.useGlobalGuards(new RolesGuard(reflector));

  const port = process.env.PORT || 3007;

  await app.listen(port, () => {
    console.log(`Listen on port ${port}`);
  });
}

bootstrap();
