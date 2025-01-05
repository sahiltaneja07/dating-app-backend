import { Module } from '@nestjs/common';
import { MailSenderService } from './services/mail-sender.service';
import { ResponseService } from './services/response.service';
import { TokenService } from './services/token.service';

@Module({
    providers: [MailSenderService, ResponseService, TokenService],
    exports: [MailSenderService, ResponseService, TokenService],
})
export class SharedModule { }
