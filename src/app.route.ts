import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { LikesModule } from './likes/likes.module';

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
                        path: 'user',
                        module: UserModule,
                    },
                    {
                        path: 'likes',
                        module: LikesModule,
                    },
                ],
            },
        ]),
    ],
})

export class RouteModule { }