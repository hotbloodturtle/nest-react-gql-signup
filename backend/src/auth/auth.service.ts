import { Injectable } from '@nestjs/common';
import { User } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { SigninInput, SignupInput } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  signup(input: SignupInput): Promise<User> {
    return this.usersService.createUser(input);
  }

  async signin(input: SigninInput): Promise<User> {
    const user = await this.usersService.findOne(input.email);
    if (user && user.compoarePassword(input.password)) {
      return user;
    }
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && user.compoarePassword(password)) {
      return user;
    }
    return null;
  }
}
