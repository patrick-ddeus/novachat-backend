import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
import { AuthService } from './auth/auth.service';
import { UserRepository } from './user.repository';
import { ProfileService } from '../profile/profile.service';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UserService, UserRepository, AuthService, ProfileService],
  exports: [UserService, AuthService],
})
export class UsersModule {}
