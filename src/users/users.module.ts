import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UserService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UserService],
})
export class UsersModule {}
