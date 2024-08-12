// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/service/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.getUserValidation(email, pass);
    console.log('User found:', user.password);
    console.log('User found:', pass);
    //bcrypt.compareSync(pass, user.password)
    if (user && pass === user.password) {
      const { password, ...result } = user;
      console.log('User validated:', result);
      return result;
    }
    return null;
  }
  

  async login(user: any): Promise<any> {
    const payload = { email: user.email, sub: user.userId };
    const accessToken = this.jwtService.sign(payload);
    return {
      access_token: accessToken,
      user: user,
    };
  }
}
