import 'reflect-metadata';
import {NestFactory} from '@nestjs/core';
import {ValidationPipe} from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {initializeTransactionalContext} from 'typeorm-transactional';
import {get} from 'env-var';
import {AppModule} from './app.module';

async function bootstrap() {
    initializeTransactionalContext();

    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );

    const config = new DocumentBuilder()
        .setTitle('Promo Code API')
        .setDescription('REST API for managing and activating promo codes')
        .setVersion('1.0')
        .build();

    SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, config));

    const port = get('APP_PORT').default('3000').asPortNumber();

    await app.listen(port);
}

bootstrap();
