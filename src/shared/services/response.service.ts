import { Injectable } from '@nestjs/common';
import { ResponseDTO } from '../dto/response.dto';

@Injectable()
export class ResponseService {
    sendResponse<T>(status: string, data?: T, message?: string): ResponseDTO<T> {
        let response = {status} as any;
        if (data) {
            response[data] = data;
        }
        if (message) {
            response[message] = message;
        }
        return response;
    }
}
