import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateLoginDto } from './dto/create-login.dto';
import { users } from 'models';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(users)
    private userRepository: Repository<users>,
    private jwtService: JwtService,
  ) {}

  async login(
    createLoginDto: CreateLoginDto,
  ): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findOne({
      where: { username: createLoginDto.name },
    });
    if (!user) {
      return null;
    }

    const match = await bcrypt.compare(createLoginDto.pass, user.user_password);
    if (!match) {
      return null;
    }

    const check = { userId: user.id, username: user.username };
    const accessToken = this.jwtService.sign(check);
    return { accessToken };
  }
}
