import { Controller, Post, Body } from '@nestjs/common';
import { SignInDto } from './dto/auth.dto';
import { UserService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly UserService: UserService) {}

  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto) {
    this.UserService.createUser(signInDto);
  }
}
