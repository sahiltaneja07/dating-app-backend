import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { LikesModule } from './likes/likes.module';
import { RecommendationModule } from './recommendation/recommendation.module';

@Module({
    imports: [
        RouterModule.register([
            {
                path: 'api',
                children: [
                    {
                        path: 'auth',
                        module: AuthModule,
                    },
                    {
                        path: 'likes',
                        module: LikesModule,
                    },
                    {
                        path: 'recommendation',
                        module: RecommendationModule,
                    },
                ],
            },
        ]),
    ],
})

export class RouteModule { }