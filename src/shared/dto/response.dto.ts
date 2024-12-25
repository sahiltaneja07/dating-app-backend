export class ResponseDTO<T> {
    status: string;
    data?: T;
    message?: string;
}