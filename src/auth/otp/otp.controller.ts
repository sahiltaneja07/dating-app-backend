import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { OtpDTO } from './dto/otp.dto';
import * as otpGenerator from 'otp-generator';

@Controller('otp')
export class OtpController {
    @Post()
    async sendOtp(@Body() otpBody: OtpDTO): Promise<any> {
        const { email } = otpBody;
        if (!email) {
            throw new BadRequestException('Email field is missing');
        }
        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        return otp;
        // sendVerificationEmail(email, otp);
        // await authService.saveOtp(email, otp);
        // res.status(200).json({
        //     status: 'success',
        //     data: {
        //         otp: otp,
        //     },
        // });
    }
}
