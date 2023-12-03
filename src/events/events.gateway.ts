import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
  WebSocketServer,
} from '@nestjs/websockets';
import { EventsService } from './event.service';
import { MessageDto } from './dto/message.dto';

@WebSocketGateway(8082, { cors: true })
export class EventsGateway {
  @WebSocketServer()
  server;

  constructor(private readonly eventsService: EventsService) {}

  @SubscribeMessage('messages')
  async handleMessages(@MessageBody() data: MessageDto) {
    await this.eventsService.createMessage(data);
    this.server.emit('messages', data);
  }

  @SubscribeMessage('userSendingStatus')
  handleUserSending(@MessageBody() data: string): WsResponse<unknown> {
    const event = 'userSendingStatus';
    this.server.emit('userSendingStatus', data);
    return { event, data };
  }
}