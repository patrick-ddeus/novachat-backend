import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private readonly prismaService: PrismaService) {}

  getOneProfile(userId: number) {
    return this.prismaService.profile.findFirst({
      where: {
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            password: false,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
  }

  updateProfile(email: string, username: string, aboutMe: string, id: number) {
    return this.prismaService.profile.update({
      data: {
        user: {
          update: {
            email,
          },
        },
        nickname: username,
        aboutMe: aboutMe,
      },
      where: {
        userId: id,
      },
    });
  }
}
