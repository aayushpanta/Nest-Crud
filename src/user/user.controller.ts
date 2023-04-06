import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator/';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UserController {

    constructor(private userService: UserService){}

    @UseGuards(JwtGuard)    // custom guard (required for all paths in controller if authentication is used, else gives request.user undefined,)
    @Get('me')
    getMe(@GetUser('id') userId: number,@GetUser() user: User) {       // custom decorator
        // console.log("Request ",req)
        // console.log({user: req.user})
        // return 'user info'
        console.log("get request from controller, getMe ",user)
        console.log("userId is", userId)

        return user
    }
    @UseGuards(JwtGuard)
    @Patch()
    editUser(@GetUser() user: User, @Body() dto: EditUserDto) {
        console.log("from user controller, user", user)
        console.log("userId value is", user.id)
        return this.userService.editUser(user.id, dto)
    }


}
