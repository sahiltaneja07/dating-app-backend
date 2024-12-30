import { Module } from '@nestjs/common';
import { RecommendationController } from './recommendation.controller';
import { RecommendationService } from './recommendation.service';
import { UserSchema } from 'src/user/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from 'src/shared/shared.module';

@Module({
    imports: [
        SharedModule,
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ],
    controllers: [RecommendationController],
    providers: [RecommendationService],
})
export class RecommendationModule {}
