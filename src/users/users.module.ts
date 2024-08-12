import { forwardRef,Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { UsersController } from './controller/users.controller';
import { AuthenticationModule } from '../authentication/authentication.module'; // Importa el AuthModule

@Module({
    imports: [forwardRef(() => AuthenticationModule)], // Utiliza forwardRef si hay dependencia circular
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
  })
  export class UsersModule {}
