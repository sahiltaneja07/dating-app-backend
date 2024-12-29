import { Injectable } from '@nestjs/common';
import { ResponseDTO } from '../dto/response.dto';

@Injectable()
export class ResponseService {
    sendResponse<T>(statusCode: number, data: Record<string, T>): ResponseDTO<T> {
        let response: ResponseDTO<T> = {
            statusCode,
            status: 'success',
            data
        };
        return response;
    }
}
