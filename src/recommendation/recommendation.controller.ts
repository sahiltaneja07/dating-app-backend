import { Controller, Get, Headers } from '@nestjs/common';
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
    async getRecommendedUsers(@Headers() headers): Promise<ResponseDTO<User[]>> {
        const users = await this.recommendationService.getAllRecommendedUsers(headers?.userId);
        return this.responseService.sendResponse(200, { users });
    }
}
