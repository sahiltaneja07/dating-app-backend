import { Controller, ForbiddenException, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { Response, Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { ResponseService } from '../../shared/services/response.service';
import { ResponseDTO } from 'src/shared/dto/response.dto';
import { UserService } from 'src/shared/services/user.service';
import { TokenService } from 'src/shared/services/token.service';
import { AuthService } from '../auth.service';
import { User } from 'src/user/schemas/user.schema';

@Controller('refresh')
export class RefreshController {
    constructor(
        private userService: UserService,
        private responseService: ResponseService,
        private authService: AuthService,
        private tokenService: TokenService
    ) {}

    @Post('token')
    async handleRefreshToken(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response
    ): Promise<ResponseDTO<User>> {
        const refreshToken = req.cookies?.refreshToken;
        if (!refreshToken) {
            throw new UnauthorizedException('RefreshToken Expired');
        }
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');

        const dbUser = await this.userService.findUser('refreshToken', refreshToken);
        if (!dbUser) {
            throw new UnauthorizedException('RefreshToken Expired');
        }

        const cookieUser = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        if (!cookieUser) {
            throw new UnauthorizedException('RefreshToken Expired');
        }

        if (dbUser._id.toString() !== cookieUser.userId) {
            throw new ForbiddenException();
        }
        const {accessToken: newAccessToken, refreshToken: newRefreshToken} = this.tokenService.buildTokens(dbUser);
        const user = await this.authService.updateAndReturnUser(dbUser._id, newRefreshToken);
        this.tokenService.setTokens(res, newAccessToken, newRefreshToken);
        return this.responseService.sendResponse(200, { user });
    }
}
