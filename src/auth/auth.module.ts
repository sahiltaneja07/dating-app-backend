import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { OtpController } from './otp/otp.controller';
import { OtpService } from './otp/otp.service';
import { SharedModule } from 'src/shared/shared.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OtpSchema } from './otp/schemas/otp.schema';

@Module({
  imports: [SharedModule, MongooseModule.forFeature([{name: 'Otp', schema: OtpSchema}])],
  controllers: [AuthController, OtpController],
  providers: [OtpService]
})
export class AuthModule {}
