// auth.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './service/authentication.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.register({
        secret: '0926f13503583bddb9331eed5fbb4fd7dfc26002312022dbfb5bc99638f57fda',
        signOptions: { expiresIn: '15s' },
    })      
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthenticationModule {}
