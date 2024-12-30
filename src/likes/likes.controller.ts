import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { LikesService } from './likes.service';

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
        return this.likesService.addLikeSent(data);
    }

    // Remove like sent from the collection
    @Delete('sent/:id')
    async cancelLikeSent(@Param('id') id: string): Promise<boolean> {
        return this.likesService.cancelLikeSent(id);
    }

    // Get users list of likes received
    @Get('received/:userId')
    async getLikesReceived(@Param('userId') userId: string): Promise<any> {
        return this.likesService.getLikesReceived(userId);
    }

    // Add like received to the collection
    @Post('received/add')
    async addLikeReceived(@Body() data: any): Promise<any> {
        return this.likesService.addLikeReceived(data);
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