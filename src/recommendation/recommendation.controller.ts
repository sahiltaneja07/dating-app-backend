import { Controller, Get } from '@nestjs/common';
import { User } from 'src/user/schemas/user.schema';
import { RecommendationService } from './recommendation.service';
import { ResponseService } from 'src/shared/services/response.service';
import { ResponseDTO } from 'src/shared/dto/response.dto';

@Controller()
export class RecommendationController {
    constructor(
        private recommendationService: RecommendationService,
        private responseService: ResponseService,
    ) {}

    @Get('users')
    async getRecommendedUsers(): Promise<ResponseDTO<User[]>> {
        const users = await this.recommendationService.getAllRecommendedUsers();
        return this.responseService.sendResponse(200, { users });
    }
}
