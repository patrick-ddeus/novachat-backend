import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';
import { AuthService } from './auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUpUser(signUpDto);
  }

  @Post('sign-in')
  @HttpCode(200)
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signInUser(signInDto);
  }
}
