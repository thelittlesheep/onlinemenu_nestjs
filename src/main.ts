import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import 'dotenv/config';

import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import * as connectRedis from 'connect-redis';
import { createClient } from 'redis';

declare const module: any;
// redis@v3
// let RedisStore = require("connect-redis")(session); 等同下面
const RedisStore = connectRedis(session);
const redisClient = createClient({ host: 'onlinemenu_redis', port: 6379 });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://0.0.0.0:3001',
      'http://localhost:3001',
      'http://192.168.0.197:3001',
      'http://localhost:4173',
      'https://lshuang.tw',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    // exposedHeaders: ['Set-Cookie'],
  });
  app.useGlobalPipes(new ValidationPipe());
  // section of session middleware
  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        // 設定 session cookie 的 domain 屬性。
        domain:
          process.env.NODE_ENV === 'production'
            ? 'lshuang.tw'
            : '192.168.0.197',
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
    .setTitle('Api')
    .setDescription('Api')
    .setVersion('1.0')
    .addServer('http://localhost:3000')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  await app.listen(3000);
}
bootstrap();
