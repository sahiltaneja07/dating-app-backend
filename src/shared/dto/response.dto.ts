export class ResponseDTO<T> {
    status: number;
    data?: T;
    message?: string;
}