import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { EventsService } from './event.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [EventsGateway, EventsService, PrismaService],
  exports: [EventsGateway],
})
export class EventsModule {}
