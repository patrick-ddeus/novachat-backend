import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private readonly prismaService: PrismaService) {}

  getMessages(channelId: number) {
    return this.prismaService.message.findMany({ where: { channelId } });
  }
}
