import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: mongoose.Model<User>) {

    }

    async create(userData: User): Promise<User> {
        return this.userModel.create(userData);
    }

    async getUserById(userId: string): Promise<User> {
        return this.userModel.findById(userId);
    }
}