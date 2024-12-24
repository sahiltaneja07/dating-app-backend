import { Controller, Get } from '@nestjs/common';

@Controller()
export class AuthController {
    
    @Get()
    getUser(): string {
        return 'auth controller';
    }
}
