import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { SigninInput, SignupInput, TokenType } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  signup(input: SignupInput): Promise<User> {
    return this.usersService.createUser(input);
  }

  async signin(input: SigninInput): Promise<TokenType> {
    const user = await this.usersService.findOne(input.email);
    if (user && user.compoarePassword(input.password)) {
      const payload = { username: user.email, sub: user.id };
      return {
        accessToken: this.jwtService.sign(payload),
      };
    }
  }
}
