
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { MongoError } from "mongodb";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const message = exception.message;

        response
            .status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                // path: request.url,
                message: message
            });
    }
}

@Catch(MongoError)
export class MongoFilter implements ExceptionFilter {
    catch(exception: MongoError, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse();
        switch (exception.code) {
            case 11000: {
                response
                    .status(400)
                    .json({
                        statusCode: 400,
                        timestamp: new Date().toISOString(),
                        message: 'User already exists.'
                    });
                break;
            }
            default: {
                response.status(500).json({
                    statusCode: 500,
                    timestamp: new Date().toISOString(),
                    message: 'Internal error.'
                });
            }
        }
    }
}
