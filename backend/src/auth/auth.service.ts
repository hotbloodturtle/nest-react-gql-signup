import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { SigninInput, SignupInput, TokenType } from './auth.dto';
import { Verification } from './auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Verification)
    private repository: Repository<Verification>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  signup(input: SignupInput): Promise<User> {
    return this.usersService.createUser(input);
  }

  async signin(input: SigninInput): Promise<TokenType> {
    const user = await this.usersService.findOne(input.email);
    if (user && user.comparePassword(input.password)) {
      const payload = { username: user.email, sub: user.id, name: user.name };
      return {
        accessToken: this.jwtService.sign(payload),
        refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
      };
    }
  }

  verifications(): Promise<Verification[]> {
    return this.repository.find({ relations: ['user'] });
  }
}
