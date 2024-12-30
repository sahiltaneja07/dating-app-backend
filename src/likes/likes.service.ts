import { ConflictException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { LikesSent } from './schemas/likes-sent.schema';
import { LikesReceived } from './schemas/likes-received.schema';

@Injectable()
export class LikesService {
    constructor(
        @InjectModel(LikesSent.name) private likesSentModel: mongoose.Model<LikesSent>,
        @InjectModel(LikesReceived.name) private likesReceivedModel: mongoose.Model<LikesReceived>) { }

    async addLikeSent(data: any): Promise<any> {
        const document = await this.likesSentModel.findOne({ userId: data.userId, like_sent_to: data.like_sent_to });
        if (document) {
            throw new ConflictException('Like already sent.');
        }
        return await this.likesSentModel.create(data);
    }

    async getLikesSent(userId: string): Promise<any> {
        const likesSentList = await this.likesSentModel.find({ userId }).populate('like_sent_to').exec();
        if (!likesSentList) {
            throw new NotFoundException('User not found');
        }
        return likesSentList;
    }

    async cancelLikeSent(id: string): Promise<any> {
        return await this.likesSentModel.deleteOne({ _id: id });
    }

    async addLikeReceived(data: any): Promise<any> {
        return await this.likesReceivedModel.create(data);
    }

    async getLikesReceived(userId: string): Promise<any> {
        const likesReceivedList = await this.likesReceivedModel.find({ userId }).populate('like_received_from').exec();;
        if (!likesReceivedList) {
            throw new NotFoundException('User not found');
        }
        return likesReceivedList;
    }
}
