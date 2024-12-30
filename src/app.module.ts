import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RouteModule } from './app.route';
import { MatchesModule } from './matches/matches.module';
import { LikesModule } from './likes/likes.module';
import { HttpExceptionFilter } from './http-exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { RecommendationModule } from './recommendation/recommendation.module';

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
export class AppModule { }
