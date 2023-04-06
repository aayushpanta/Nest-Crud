import { Body, Controller, HttpCode, HttpStatus, Post, Req } from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { ApiAcceptedResponse, ApiCreatedResponse, ApiDefaultResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('auth')
@Controller('auth')
export class AuthController{
    constructor (private authService: AuthService){}

    @ApiCreatedResponse({type: Object})
    @Post('signup')
    signup(@Body() dto: AuthDto){
        console.log("Dto from controller")
        console.log({dto})
        return  this.authService.signup(dto)
    }

    @ApiOkResponse()
    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signin(@Body() dto: AuthDto){
        return this.authService.signin(dto)
    }

}