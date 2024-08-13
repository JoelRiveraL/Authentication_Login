import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from "./guard/auth.guard";
import { Request } from 'express';


@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post('register')
    async register(@Body() userData: any) {
        return this.authService.register(userData);
    }

    @Post('login')
    login(@Body() userData: any) {
        return this.authService.login(userData);
    }

    @Get('profile')
    @UseGuards(AuthGuard)
    profile(@Req() req: any) {
        return req.user;
    }
}
