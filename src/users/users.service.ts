import { Injectable, ConflictException } from '@nestjs/common';
import { SignUpDto } from './dto/signUp.dto';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  private SALT = 12;

  constructor(private readonly userRepository: UserRepository) {}
  async createUser(body: SignUpDto) {
    const { password } = body;

    try {
      const user = await this.userRepository.create({
        ...body,
        password: await bcrypt.hash(password, this.SALT),
        profile: {
          create: {
            nickname: body.username,
            aboutMe: '',
            avatar: '',
          },
        },
      });
      return user;
    } catch (error) {
      if (error.code === 'P2002')
        throw new ConflictException('Account already exists');
    }
  }

  findByEmail(email: string) {
    return this.userRepository.listOne({ email });
  }
}
