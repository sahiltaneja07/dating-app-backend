import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: mongoose.Model<User>) {

    }

    async create(user: User): Promise<User> {
        return await this.userModel.create(user);
    }

    async getUserById(userId: string): Promise<User> {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }
}
