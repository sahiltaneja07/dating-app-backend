import { Injectable } from '@nestjs/common';
import { CookieOptions, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserDocument } from 'src/user/schemas/user.schema';

enum TokenExpiration {
    Access = 8 * 60 * 60, // 8 hours
    Refresh = 30 * 24 * 60 * 60, // 30 days
}

enum CookieName {
    Access = 'access',
    Refresh = 'refresh'
}

@Injectable()
export class TokenService {
    cookieOptions: CookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/'
    }

    signAccessToken(payload: any) {
        return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: TokenExpiration.Access,
        });
    }
    
    signRefreshToken(payload: any) {
        return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: TokenExpiration.Refresh,
        });
    }

    buildTokens(user: UserDocument) {
        const accessPayload = {userId: user._id};
        const refreshPayload = {userId: user._id, email: user.email};

        const accessToken = this.signAccessToken(accessPayload);
        const refreshToken = this.signRefreshToken(refreshPayload);

        return {accessToken, refreshToken};
    }

    setTokens(res: Response, accessToken: string, refreshToken?: string) {
        res.cookie(CookieName.Access, accessToken);
        if (refreshToken) res.cookie(CookieName.Refresh, refreshToken, this.cookieOptions);
    }
}
