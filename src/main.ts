import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter, MongoFilter } from './http-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new MongoFilter(), new HttpExceptionFilter());
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
