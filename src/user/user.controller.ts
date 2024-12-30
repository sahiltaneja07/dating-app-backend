import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import { User } from './schemas/user.schema';

@Controller()
export class UserController {
    constructor(private userService: UserService) {}
}
