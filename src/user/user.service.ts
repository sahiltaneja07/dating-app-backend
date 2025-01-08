import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: mongoose.Model<User>,
    ) {}

    async findUser(field: string, value: string | mongoose.Types.ObjectId): Promise<UserDocument> {
        const user = await this.userModel.findOne({ [field]: value });
        return user;
    }
}
