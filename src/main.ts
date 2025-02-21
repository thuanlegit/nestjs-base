import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import bodyParser from 'body-parser';
import { NextFunction, Request, Response } from 'express';

import { CorsConfig, NestConfig, SwaggerConfig } from '@/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Body parser
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(
    bodyParser.urlencoded({
      limit: '50mb',
      extended: true,
      parameterLimit: 50000,
    }),
  );

  // Validation
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Enable shutdown hook
  app.enableShutdownHooks();

  const configService = app.get(ConfigService);
  const nestConfig = configService.getOrThrow<NestConfig>('nest');
  const corsConfig = configService.getOrThrow<CorsConfig>('cors');
  const swaggerConfig = configService.getOrThrow<SwaggerConfig>('swagger');

  // Swagger API
  if (swaggerConfig.enabled) {
    const options = new DocumentBuilder()
      .setTitle(swaggerConfig.title)
      .setDescription(swaggerConfig.description)
      .setVersion(swaggerConfig.version)
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);

    app.use(
      new RegExp(`/${swaggerConfig.path}.*`, 'i'),
      (req: Request, res: Response, next: NextFunction) => {
        function parseAuthHeader(input: string): { user: string; password: string } {
          const [, encodedPart] = input.split(' ');

          const buff = Buffer.from(encodedPart, 'base64');
          const text = buff.toString('ascii');
          const [user, password] = text.split(':');

          return { user, password };
        }

        function unauthorizedResponse(): void {
          res.status(401).set('WWW-Authenticate', 'Basic').send();
        }

        const authorization = req?.headers?.authorization;
        if (!authorization) {
          return unauthorizedResponse();
        }

        const credentials = parseAuthHeader(authorization);
        if (
          credentials?.user !== swaggerConfig.username ||
          credentials?.password !== swaggerConfig.password
        ) {
          return unauthorizedResponse();
        }

        next();
      },
    );

    SwaggerModule.setup(swaggerConfig.path, app, document, {
      swaggerOptions: { persistAuthorization: true },
    });
  }

  // CORS
  if (corsConfig.enabled) {
    app.enableCors();
  }

  await app.listen(nestConfig.port);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
