import { Controller, Post, Body, UseGuards, Get, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { AuthService } from '../../authentication/service/authentication.service';
import { JwtAuthGuard } from '../../authentication/jwt-auth.guard';
import * as bcrypt from 'bcryptjs';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('createUser')
  async createUser(@Body() userData: any): Promise<{ message: string }> {
    await this.usersService.createUser(userData);
    return { message: 'Usuario creado exitosamente' };
  }

  @Get('getUsers')
  @UseGuards(JwtAuthGuard)  // Protege esta ruta con el guard de JWT
  async getUsers(): Promise<any> {
    return this.usersService.getUsers();
  }

  @Post('login')
  async login(@Body() userData: any): Promise<any> {
    const user = await this.authService.validateUser(
      userData.email,
      userData.password,
    );
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    console.log('User:', this.authService.login(user));
    return this.authService.login(user);
  }  
}
