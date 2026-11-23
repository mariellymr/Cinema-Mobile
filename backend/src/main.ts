import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // Configuração do ValidationPipe (importante para o Swagger ler as validações dos DTOs)
  app.useGlobalPipes(new ValidationPipe());

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('User CRUD API')
    .setDescription('Documentação da API de Usuários com NestJS e Prisma')
    .setVersion('1.0')
    .addTag('users')
    .addTag('auth')
    .addBearerAuth( // Adiciona o campo de autenticação no Swagger
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        in: 'header',
      },
      'token',
    )

    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Rota onde o Swagger estará disponível

  await app.listen(3000);
  console.log(`Application is running on: http://localhost:3000/api`);
}

bootstrap();