import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LikesService } from './likes.service';
import { User } from 'src/user/schemas/user.schema';

@Controller()
export class LikesController {
    constructor(private likesService: LikesService) { }

    // Get users list of likes sent
    @Get('sent/:userId')
    async getLikesSent(@Param('userId') userId: string): Promise<any> {
        return this.likesService.getLikesSent(userId);
    }

    // Add like sent to the collection
    @Post('sent/add')
    async addLikeSent(@Body() data: any): Promise<any> {
        return this.likesService.create(data);
    }

    // Remove like sent from the collection
    @Post()
    async unlikeSent() {

    }

    // Get users list of likes received
    @Get()
    async getLikesReceived() {

    }

    // Add like received to the collection
    @Post()
    async addLikeReceived() {

    }

    // Shift the user details from LikesReceived collection to Matches collection
    @Post()
    async acceptLikeReceived() {

    }

    // Shift the user details from LikesReceived collection to Dislikes collection
    @Post()
    async declineLikeReceived() {

    }
}