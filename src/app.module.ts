import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RouteModule } from './app.route';
import { MatchesModule } from './matches/matches.module';
import { LikesModule } from './likes/likes.module';
import { RecommendationModule } from './recommendation/recommendation.module';
import { AuthMiddleware } from './auth.middleware';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
        MongooseModule.forRoot(process.env.MONGODB_URL),
        RouteModule,
        UserModule,
        AuthModule,
        LikesModule,
        MatchesModule,
        RecommendationModule,
    ],
    controllers: [AppController],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes('api/likes', 'api/recommendation');
    }
}
