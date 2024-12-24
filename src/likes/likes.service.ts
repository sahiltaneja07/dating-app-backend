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

    async getLikesSent(userId: string): Promise<User[]> {
        // const likesSentList = await this.likesSentModel.find({ userId });
        // if (!likesSentList) {
        //     throw new NotFoundException('User not found');
        // }
        return null;
    }
}
