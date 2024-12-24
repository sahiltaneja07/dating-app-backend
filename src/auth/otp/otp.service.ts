import { Injectable } from '@nestjs/common';
import { Otp } from './schemas/otp.schema';

@Injectable()
export class OtpService {

    sendVerificationEmail(email: string, otp: string): void {
        try {
            const mailResponse = await mailSender(
                email,
                "Verification Email",
                `<h1>Please confirm your OTP</h1>
                 <p>Here is your OTP code: ${otp}</p>
                 <p>This is valid for next 30 mins</p>`
            );
        } catch (error) {
            console.log("Error occurred while sending email: ", error);
        }
    }
}
