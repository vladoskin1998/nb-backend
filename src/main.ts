import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { MyLogger } from './logger/MyLogger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as express from 'express'; 

console.log("https://nb-nb.onrender.com");


async function bootstrap() {
  config({
    path:'../.env'
  });
  const app = await NestFactory.create(AppModule, {logger: new MyLogger()});
  app.enableCors(
    {
      origin: ['http://localhost:5000','http://localhost:3000', "https://nb-nb.onrender.com", "http://5.180.180.221:5000"], // Укажите домен вашего клиента
      credentials: true, 
    }
  );
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix("api");
  app.use(cookieParser());
  app.use(express.static('build'));
  await app.listen(process.env.APP_PORT || 5000, () =>
    console.log('Server started on port ' + process.env.APP_PORT || 5000),
  );
}
bootstrap();
