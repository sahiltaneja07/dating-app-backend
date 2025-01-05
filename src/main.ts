import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { HttpExceptionFilter, MongoFilter } from './http-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new MongoFilter(), new HttpExceptionFilter());
    app.enableCors({
        credentials: true,
        origin: process.env.CLIENT_URL,
    })
    app.use(cookieParser());
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
