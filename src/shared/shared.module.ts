import { Module } from '@nestjs/common';
import { MailSenderService } from './services/mail-sender.service';
import { ResponseService } from './services/response.service';

@Module({
    providers: [MailSenderService, ResponseService],
    exports: [MailSenderService, ResponseService],
})
export class SharedModule {}
