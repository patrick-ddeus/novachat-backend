import { IsNotEmpty } from 'class-validator';

export class MessageDto {
  authorId: number;
  @IsNotEmpty()
  content: string;
  author: string;
  channelId: number;
  createdAt: number;
}
