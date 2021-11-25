import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { NestFactory, Reflector } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { credential, ServiceAccount } from 'firebase-admin';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { cpus } from 'os';


async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors: true});

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(
    app.get(Reflector)
  ));
  const config = new DocumentBuilder()
    .setTitle("E-commerce")
    .setDescription("API description")
    .setVersion("1.0")
    .addTag("e-commerce")
    .build();

  app.useGlobalFilters(new HttpExceptionFilter());
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);


  // Initialize the firebase admin app
  const serviceAccount : ServiceAccount = require('./ecommerce-file-storage-c603e-firebase-adminsdk-bctqi-1f5a3cbf24.json');
  admin.initializeApp({credential: admin.credential.cert(serviceAccount)});


  await app.listen(process.env.PORT || 3000);
}
bootstrap();
