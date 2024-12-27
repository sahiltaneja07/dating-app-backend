import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import { User } from './schemas/user.schema';

@Controller()
export class UserController {
    constructor(private userService: UserService) { }

    @Post()
    async createUser(@Body() user: UserDTO): Promise<User> {
        return this.userService.create(user);
    }

    @Get(':userId')
    async getUser(@Param('userId') userId: string): Promise<User> {
        const user = await this.userService.getUserById(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user
    }
}
