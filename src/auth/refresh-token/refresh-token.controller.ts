import { Controller, ForbiddenException, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { Response, Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { ResponseService } from '../../shared/services/response.service';
import { ResponseDTO } from 'src/shared/dto/response.dto';
import { UserService } from 'src/user/user.service';
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
        const refreshToken = req.cookies?.refresh;
        console.log(refreshToken, 'refreshCookie');
        if (!refreshToken) {
            throw new UnauthorizedException('Unauthorized user');
        }
        res.clearCookie('refresh');

        const dbUser = await this.userService.findUser('refreshToken', refreshToken);
        if (!dbUser) {
            throw new UnauthorizedException('Unauthorized user');
        }

        const cookieUser = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        if (!cookieUser) {
            throw new UnauthorizedException('Unauthorized user');
        }

        if (dbUser._id !== cookieUser.userId) {
            throw new ForbiddenException();
        }
        const {accessToken: newAccessToken, refreshToken: newRefreshToken} = this.tokenService.buildTokens(dbUser);
        const user = await this.authService.updateAndReturnUser(dbUser._id, newRefreshToken);
        user.accessToken = newAccessToken;
        this.tokenService.setTokens(res, refreshToken);
        return this.responseService.sendResponse(200, { user });
    }
}