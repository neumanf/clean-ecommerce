import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { TransformInterceptor } from './interceptors/transform.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(new TransformInterceptor());
    app.enableCors({ origin: configService.get('frontendUrl') });

    await app.listen(configService.get('port'));
}
bootstrap();
