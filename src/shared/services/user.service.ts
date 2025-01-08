import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User, UserDocument } from 'src/user/schemas/user.schema';

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
