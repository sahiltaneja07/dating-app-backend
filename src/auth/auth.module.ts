import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { OtpController } from './otp/otp.controller';
import { OtpService } from './otp/otp.service';

@Module({
  controllers: [AuthController, OtpController],
  providers: [OtpService]
})
export class AuthModule {}
