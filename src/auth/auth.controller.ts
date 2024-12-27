import {
    BadRequestException,
    Body,
    Controller,
    ForbiddenException,
    Post,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { ResponseService } from '../shared/services/response.service';

@Controller()
export class AuthController {
    constructor(
        private authService: AuthService,
        private jwtService: JwtService,
        private responseService: ResponseService,
    ) {}

    @Post()
    async loginUser(
        @Body() loginBody: { email: string; otp: string },
    ): Promise<any> {
        const { email, otp } = loginBody;
        if (!(email && otp)) {
            throw new BadRequestException('Email or Otp field is missing');
        }
        const otpDocument = await this.authService.findOtp(email);
        if (!otpDocument) {
            throw new ForbiddenException('OTP got expired');
        } else if (otpDocument && otpDocument.otp != otp) {
            throw new ForbiddenException('Incorrect OTP');
        }
        let user = await this.authService.findUserByEmail(email);
        if (!user) {
            user = await this.authService.registerUser(email);
            this.authService.sendRegistrationEmail(email);
        }
        const authToken = this.jwtService.sign(JSON.stringify(user), {
            secret: process.env.MY_JWT_TOKEN,
        });
        user = await this.authService.loginUser(user._id, authToken);
        await this.authService.deleteOtp(email);
        return this.responseService.sendResponse(200, { user });
    }
}
