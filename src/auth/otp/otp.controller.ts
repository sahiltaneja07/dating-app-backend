import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { OtpDTO } from './dto/otp.dto';
import * as otpGenerator from 'otp-generator';
import { OtpService } from './otp.service';
import { ResponseService } from '../../shared/services/response.service';

@Controller('otp')
export class OtpController {

    constructor(
        private otpService: OtpService,
        private responseService: ResponseService
    ) {}

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
        this.otpService.sendVerificationEmail(email, otp);
        return this.responseService.sendResponse('200', otp);
        // await authService.saveOtp(email, otp);
        // res.status(200).json({
        //     status: 'success',
        //     data: {
        //         otp: otp,
        //     },
        // });
    }
}
