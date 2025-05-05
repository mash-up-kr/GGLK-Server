import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type { Express } from 'express';
import redoc from 'redoc-express';
import { GlobalResponseInterceptor, HttpExceptionFilter } from '@/common';

// Redoc Setting
export function ApplicationRedocConfig(app: INestApplication<Express>) {
  app.use(
    '/redoc',
    redoc({
      title: 'Your API Title',
      specUrl: 'docs-json',
    }),
  );
}

// Application Nest.js Configuration
export function ApplicationNestConfig(app: INestApplication) {
  const reflector = app.get<Reflector>(Reflector);

  // CORS Policy
  // Option Document: https://github.com/expressjs/cors#configuration-options
  app.enableCors({
    origin: '*',
  });

  // Application Versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // Exception Filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Global Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: true,
    }),
  );

  // Global Interceptors
  app.useGlobalInterceptors(
    new GlobalResponseInterceptor(),
    new ClassSerializerInterceptor(reflector),
  );
}

// Application Swagger Configuration
export function ApplicationSwaggerConfig(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('깔깔룩위원회 API OpenAPI Document')
    .addOAuth2()
    .addBearerAuth()
    .setContact(
      'MashUp Node GGLK',
      'https://mash-up.kr/',
      'mashup.node@gmail.com',
    )
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}
