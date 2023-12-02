import { Controller, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Post('sign-in')
  signIn(Body:) {}
}
