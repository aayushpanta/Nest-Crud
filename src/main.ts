import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: false}))

  const config = new DocumentBuilder()
  .setTitle('Nest CRUD API')
  .setDescription('Implementation of CRUD APIs using NestJs')
  .setVersion('1.0.0')
  .addBearerAuth()
  // .addTag('cats')
  .build();

  const document  = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  await app.listen(3333);
}
bootstrap();
