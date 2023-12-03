// authorId  Int
//   content   String
//   Channel   Channel? @relation(fields: [channelId], references: [id], onDelete: Cascade)
//   channelId Int
export class MessageDto {
  authorId: number;
  content: string;
  author: string;
  channelId: number;
  createdAt: number;
}
