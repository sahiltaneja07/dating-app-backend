import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailSenderService } from '../../shared/services/mail-sender.service';

@Injectable()
export class OtpService {

    constructor(private mailSenderService: MailSenderService) {}

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
}
