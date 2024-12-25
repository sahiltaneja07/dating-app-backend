import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RouteModule } from './app.route';
import { MatchesModule } from './matches/matches.module';
import { LikesModule } from './likes/likes.module';

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
    ],
    controllers: [AppController],
})
export class AppModule {}
