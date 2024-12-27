import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { OtpDTO } from './dto/otp.dto';
import * as otpGenerator from 'otp-generator';
import { ResponseService } from '../../shared/services/response.service';
import { AuthService } from '../auth.service';

@Controller('otp')
export class OtpController {

    constructor(
        private authService: AuthService,
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
        this.authService.sendVerificationEmail(email, otp);
        await this.authService.saveOtp(email, otp);
        return this.responseService.sendResponse(200, {otp});
    }
}
