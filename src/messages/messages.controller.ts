import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { MessagesService } from './messages.service';
import { AuthGuard } from '../guards/auth-guard';

@Controller('/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get(':channelId')
  @UseGuards(AuthGuard)
  getHello(@Param('channelId', ParseIntPipe) channelId: number) {
    return this.messagesService.getMessages(channelId);
  }
}
