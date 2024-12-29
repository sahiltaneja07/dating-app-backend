export class ResponseDTO<T> {
    statusCode: number;
    status: string;
    data: Record<string, T>;
}
