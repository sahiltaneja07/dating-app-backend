import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
        const accessToken = req?.headers?.accesstoken;
        if (!accessToken) throw new UnauthorizedException('Unauthorized user');
        const user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        req.headers.userId = user.userId;
        next();
    } catch (err) {
        throw new UnauthorizedException('Unauthorized user');
    }
  }
}
