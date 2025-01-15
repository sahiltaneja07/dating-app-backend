import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
        const accessToken = req?.cookies?.accessToken;
        if (!accessToken) throw new UnauthorizedException('AccessToken Expired');
        const user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        if (!user) throw new UnauthorizedException('AccessToken Expired');
        req.headers.userId = user.userId;
        next();
    } catch (err) {
        throw new UnauthorizedException('AccessToken Expired');
    }
  }
}
