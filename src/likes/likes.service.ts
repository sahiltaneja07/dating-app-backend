import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { LikesSent } from './schemas/likes-sent.schema';
import { LikesReceived } from './schemas/likes-received.schema';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class LikesService {
    constructor(
        @InjectModel(LikesSent.name) private likesSentModel: mongoose.Model<LikesSent>,
        @InjectModel(LikesReceived.name) private likesReceivedModel: mongoose.Model<LikesReceived>) { }

    async create(data: any): Promise<any> {
        return await this.likesSentModel.create(data);
    }

    async getLikesSent(userId: string): Promise<any> {
        const likesSentList = await this.likesSentModel.find({ userId }).populate('like_sent_to').exec();
        if (!likesSentList) {
            throw new NotFoundException('User not found');
        }
        return likesSentList;
    }
}
