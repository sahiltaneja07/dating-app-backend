import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { OtpController } from './otp/otp.controller';
import { SharedModule } from '../shared/shared.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OtpSchema } from './otp/schemas/otp.schema';
import { AuthService } from './auth.service';
import { UserSchema } from '../user/schemas/user.schema';
import { RefreshController } from './refresh-token/refresh-token.controller';

@Module({
    imports: [
        SharedModule,
        MongooseModule.forFeature([
            { name: 'Otp', schema: OtpSchema },
            { name: 'User', schema: UserSchema },
        ]),
    ],
    controllers: [AuthController, OtpController, RefreshController],
    providers: [AuthService],
})
export class AuthModule {}
