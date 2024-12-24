import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
        return this.userService.getUserById(userId);
    }
}
