import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LikesSentSchema } from './schemas/likes-sent.schema';
import { LikesReceivedSchema } from './schemas/likes-received.schema';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { SharedModule } from 'src/shared/shared.module';

@Module({
    imports: [MongooseModule.forFeature([
        { name: 'LikesSent', schema: LikesSentSchema },
        { name: 'LikesReceived', schema: LikesReceivedSchema }]
    ),
        SharedModule],
    providers: [LikesService],
    controllers: [LikesController]
})
export class LikesModule { }
