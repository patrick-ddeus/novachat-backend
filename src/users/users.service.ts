import { Injectable } from '@nestjs/common/decorators/core';
import { PrismaService } from '../prisma/prisma.service';
import { SignInDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async createUser(body: SignInDto) {
    const { email, password, username } = body;
    const saltOrRounds = 12;
    const hash = await bcrypt.hash(password, saltOrRounds);

    return await this.prismaService.user.create({
      data: {
        email,
        password: hash,
        username,
      },
    });
  }
}
