import { Module } from '@nestjs/common';
import { MailSenderService } from './services/mail-sender.service';
import { ResponseService } from './services/response.service';
import { TokenService } from './services/token.service';
import { UserService } from './services/user.service';
import { UserSchema } from 'src/user/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
    providers: [MailSenderService, ResponseService, TokenService, UserService],
    exports: [MailSenderService, ResponseService, TokenService, UserService],
})
export class SharedModule { }
