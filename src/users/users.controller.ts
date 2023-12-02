import { Controller, Post, Body } from '@nestjs/common';
import { SignInDto } from './dto/auth.dto';

@Controller('users')
export class UsersController {
  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto) {
    s;
  }
}
