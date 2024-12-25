import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailSenderService {
    async sendEmail(email: string, subject: string, body: string): Promise<any> {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
        return transporter.sendMail({
            from: 'Verbbe Team <hello.verbbe@gmail.com>',
            to: email,
            subject: subject,
            html: body,
        });
    }
}
