import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailSenderService } from '../../shared/services/mail-sender.service';
import { Otp } from './schemas/otp.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Injectable()
export class OtpService {

    constructor(
        private mailSenderService: MailSenderService,
        @InjectModel(Otp.name) private otpModel: mongoose.Model<Otp>
    ) {}

    async sendVerificationEmail(email: string, otp: string): Promise<any> {
        try {
            await this.mailSenderService.sendEmail(
                email,
                "Verification Email",
                `<h1>Please confirm your OTP</h1>
                 <p>Here is your OTP code: ${otp}</p>
                 <p>This is valid for next 30 mins</p>`
            );
        } catch (error) {
            console.log("Error occurred while sending email: ", error);
            throw new InternalServerErrorException('Error occurred while sending email');
        }
    }

    async saveOtp(email: string, otp: string): Promise<any>{
        const body = {
            email,
            otp
        };
        const otpDocument = await this.otpModel.create([body], {runValidators: true});
        if (!otpDocument) {
            throw new InternalServerErrorException('Error occurred while generating otp');
        }
    }
}
