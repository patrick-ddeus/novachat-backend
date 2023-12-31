import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { EventsModule } from './events/events.module';
import { MessagesModule } from './messages/messages.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    UsersModule,
    EventsModule,
    MessagesModule,
    ProfileModule,
    JwtModule.register({
      secret: process.env.SECRET,
      global: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
