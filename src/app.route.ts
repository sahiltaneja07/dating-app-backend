import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

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
                ],
            },
        ]),
    ],
})

export class RouteModule {}