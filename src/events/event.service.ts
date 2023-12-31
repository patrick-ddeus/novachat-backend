import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class EventsService {
  constructor(private readonly prismaService: PrismaService) {}

  createMessage(message: MessageDto) {
    return this.prismaService.message.create({
      data: {
        content: message.content,
        Author: {
          connect: {
            id: message.authorId,
          },
        },
        Channel: {
          connectOrCreate: {
            create: {
              id: message.channelId,
            },
            where: {
              id: message.channelId,
            },
          },
        },
      },
    });
  }
}
