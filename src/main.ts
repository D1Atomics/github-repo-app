import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/middleware/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('GitHub Repository Search API V1')
    .setDescription(
      'API for searching GitHub repositories by name, with sorting and ignoring',
    )
    .setVersion('1.0')
    .setContact(
      'Support',
      'https://support.github.com/',
      'vileni.jishkariani+support@gmail.com',
    )
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(3000);
}

// add message to console if error occurs
bootstrap().catch((err) => console.error('Error during bootstrap:', err));
