import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { OtpController } from './otp/otp.controller';
import { SharedModule } from '../shared/shared.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OtpSchema } from './otp/schemas/otp.schema';
import { AuthService } from './auth.service';
import { UserSchema } from '../user/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        SharedModule,
        MongooseModule.forFeature([
            { name: 'Otp', schema: OtpSchema },
            { name: 'User', schema: UserSchema },
        ]),
        JwtModule.register({ secret: process.env.MY_JWT_TOKEN }),
    ],
    controllers: [AuthController, OtpController],
    providers: [AuthService],
})
export class AuthModule {}
