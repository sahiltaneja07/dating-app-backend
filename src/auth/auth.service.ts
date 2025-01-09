import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Otp } from './otp/schemas/otp.schema';
import { User, UserDocument } from '../user/schemas/user.schema';
import { MailSenderService } from '../shared/services/mail-sender.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Otp.name) private otpModel: mongoose.Model<Otp>,
        @InjectModel(User.name) private userModel: mongoose.Model<User>,
        private mailSenderService: MailSenderService,
    ) {}

    async findOtp(email: string): Promise<Otp> {
        const otpDocument = await this.otpModel.findOne({ email });
        return otpDocument;
    }

    async findUserByEmail(email: string): Promise<UserDocument> {
        const user = await this.userModel.findOne({ email });
        return user;
    }

    async registerUser(email: string): Promise<UserDocument> {
        const body = {
            email,
            isOnboardingCompleted: false
        };
        const user = await this.userModel.create([body], {
            runValidators: true,
        });
        return user[0];
    }

    async loginUser(
        userId: mongoose.Types.ObjectId,
        refreshToken: string,
    ): Promise<UserDocument> {
        return this.updateAndReturnUser(userId, refreshToken, true);
    }

    async updateAndReturnUser(
        userId: mongoose.Types.ObjectId,
        refreshToken: string,
        isNewUser?: boolean,
    ): Promise<UserDocument> {
        const body = {
            refreshToken,
        };
        if (isNewUser) {
            body['isNewUser'] = true;
        }
        await this.userModel.updateOne(
            { _id: userId },
            {
                $set: body,
            },
        );
        return this.userModel.findOne({ _id: userId });
    }

    async saveOtp(email: string, otp: string): Promise<any> {
        const body = {
            email,
            otp,
        };
        return await this.otpModel.create([body], {
            runValidators: true,
        });
    }

    async deleteOtp(email): Promise<any> {
        await this.otpModel.deleteOne({ email });
    }

    async sendVerificationEmail(email: string, otp: string): Promise<any> {
        try {
            await this.mailSenderService.sendEmail(
                email,
                'Verification Email',
                `<h1>Please confirm your OTP</h1>
                     <p>Here is your OTP code: ${otp}</p>
                     <p>This is valid for next 30 mins</p>`,
            );
        } catch (error) {
            throw new InternalServerErrorException(
                'Error occurred while sending email',
            );
        }
    }

    async sendRegistrationEmail(email): Promise<any> {
        try {
            await this.mailSenderService.sendEmail(
                email,
                'Welcome to Verbbe',
                `<h1>Hi there</h1>
                 <p>Welcome to Verbbe</p>`,
            );
        } catch (error) {
            throw new InternalServerErrorException(
                'Error occurred while sending email',
            );
        }
    }
}
