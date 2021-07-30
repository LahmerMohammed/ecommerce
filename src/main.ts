import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  

  const config = new DocumentBuilder()
    .setTitle('E-commerce')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('e-commerce')
    .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs',app,document);

  
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
