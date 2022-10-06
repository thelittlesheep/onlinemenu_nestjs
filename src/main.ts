import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import 'dotenv/config';

import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import * as connectRedis from 'connect-redis';
import { createClient } from 'redis';
import { HttpExceptionFilter } from '@/share/responseError.filter';
import { TransformInterceptor } from './share/response.interceptor';
import { AuthenticatedGuard } from './auth/authenticaed.guard';

declare const module: any;
// redis@v3
// let RedisStore = require("connect-redis")(session); 等同下面
const RedisStore = connectRedis(session);
const redisClient = createClient({
  host: process.env.redis_host,
  port: Number(process.env.redis_port),
});
const env = process.env.NODE_ENV || 'dev';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['*'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    // exposedHeaders: ['Set-Cookie'],
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  // section of session middleware
  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        // 設定 session cookie 的 domain 屬性。
        domain: process.env.FRONTEND_DOMAIN,
        maxAge: 3600000,
        httpOnly: false,
      },
      name: 'user_session',
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  // section of swagger
  const config = new DocumentBuilder()
    .setTitle('OnlineMenu openAPI')
    .setDescription('OnlineMenu openAPI')
    .setVersion('1.0')
    .addServer(process.env.APP_URL + process.env.APP_PORT)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalFilters(new HttpExceptionFilter());

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  await app.listen(3000);
}
bootstrap();
