import { Body, ClassSerializerInterceptor, Controller, Get, HttpCode, Post, Req, Res, SerializeOptions, UseGuards, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { AuthenticationService } from './authentication.service';
import RegisterDto from './dto/createUser.dto';
import LogInDto from './dto/logIn.dto';
import JwtAuthenticationGuard from './jwt-authentication.guard';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import RequestWithUser from './requestWithUser.interface';

@Controller('authentication')
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthenticationService
    ) {}

    @Post('register')
    async register(@Body() registrationData: RegisterDto) {
        return this.authenticationService.register(registrationData);
    }

    // @HttpCode(200)
    // @UseGuards(LocalAuthenticationGuard)
    // @Post('login')
    // async logIn(@Req() request: RequestWithUser) {
    //     const user = request.user;
    //     user.password = undefined;
    //     return user;
    // }


    @HttpCode(200)
    @UseGuards(LocalAuthenticationGuard)
    @Post('login')
    async logIn(@Req() request: RequestWithUser) {
        const {user} = request;
        const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
        request.res.setHeader('Set-Cookie', cookie);
        return user;
    }

    @UseGuards(JwtAuthenticationGuard)
    @Get()
    authenticate(@Req() request: RequestWithUser) {
        const user = request.user;
        return user;
    }

    @UseGuards(JwtAuthenticationGuard)
    @Post('logout')
    async logOut(@Req() request: RequestWithUser) {
        request.res.setHeader('Set-Cookie', this.authenticationService.getCookieForLogOut());
    }
}
