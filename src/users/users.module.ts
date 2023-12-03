import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
import { AuthService } from './auth/auth.service';
import { UserRepository } from './user.repository';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UserService, UserRepository, AuthService],
})
export class UsersModule {}
