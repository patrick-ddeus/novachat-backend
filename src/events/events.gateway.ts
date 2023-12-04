import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { EventsService } from './event.service';
import { MessageDto } from './dto/message.dto';
import { UsePipes, ValidationPipe } from '@nestjs/common';

@WebSocketGateway(8082, { cors: true })
export class EventsGateway {
  @WebSocketServer()
  server;

  constructor(private readonly eventsService: EventsService) {}

  @SubscribeMessage('messages')
  @UsePipes(new ValidationPipe())
  async handleMessages(@MessageBody() data: MessageDto) {
    const message = await this.eventsService.createMessage(data);
    this.server.emit('messages', { ...data, id: message.id });
  }

  @SubscribeMessage('userSendingStatus')
  handleUserSending(@MessageBody() data: string) {
    this.server.emit('userSendingStatus', data);
  }
}
