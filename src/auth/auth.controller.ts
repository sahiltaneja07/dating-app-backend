import {
    BadRequestException,
    Body,
    Controller,
    ForbiddenException,
    Post,
    Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseService } from '../shared/services/response.service';
import { ResponseDTO } from 'src/shared/dto/response.dto';
import { User } from 'src/user/schemas/user.schema';
import { Response } from 'express';
import { TokenService } from 'src/shared/services/token.service';

@Controller()
export class AuthController {
    constructor(
        private authService: AuthService,
        private responseService: ResponseService,
        private tokenService: TokenService
    ) {}

    @Post()
    async loginUser(
        @Body() loginBody: { email: string; otp: string },
        @Res({ passthrough: true }) response: Response,
    ): Promise<ResponseDTO<User>> {
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
        const {accessToken, refreshToken} = this.tokenService.buildTokens(user);
        user = await this.authService.loginUser(user._id, refreshToken);
        delete user.refreshToken;
        user.accessToken = accessToken;
        await this.authService.deleteOtp(email);
        this.tokenService.setTokens(response, accessToken, refreshToken);
        return this.responseService.sendResponse(200, { user });
    }

}
