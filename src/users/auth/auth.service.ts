import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from '../dto/signUp.dto';
import * as bcrypt from 'bcrypt';
import { SignInDto } from '../dto/signIn.dto';
import { UserService } from '../users.service';
import { exclude } from '../../utils/exclude';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt/dist';
import { ProfileService } from '../../profile/profile.service';

@Injectable()
export class AuthService {
  ISSUER: string;

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly profileService: ProfileService,
  ) {
    this.ISSUER = 'NovaChat';
  }
  async signUpUser(body: SignUpDto) {
    const user = await this.userService.createUser(body);
    return {
      ...exclude(user, 'password'),
      ...this.generateToken({ email: user.email, id: user.id }),
    };
  }

  async signInUser(body: SignInDto) {
    const { email, password } = body;

    const user = await this.userService.findByEmail(email);

    if (!user) throw new UnauthorizedException('Email or password invalid!');

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid)
      throw new UnauthorizedException('Email or password invalid!');

    return {
      ...this.generateToken({ email: user.email, id: user.id }),
      id: user.id,
      username: user.username,
    };
  }

  generateToken(payload: JWTPayload) {
    return {
      access_token: this.jwtService.sign(payload, {
        issuer: this.ISSUER,
      }),
    };
  }

  async validateToken(token: string) {
    return await this.jwtService.verifyAsync<JWTPayload>(token, {
      issuer: this.ISSUER,
    });
  }
}

export type JWTPayload = Pick<User, 'email' | 'id'>;
