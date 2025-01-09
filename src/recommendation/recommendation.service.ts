import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class RecommendationService {

    constructor(@InjectModel(User.name) private userModel: mongoose.Model<User>) {}

    async getAllRecommendedUsers(userId: string): Promise<User[]> {
        return this.userModel.find({_id: {$ne: userId}});
    }
}
