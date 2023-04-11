import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignupInput } from '../auth/auth.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}
  findOne(username: string): Promise<User> {
    if (!username) throw new HttpException('Username is required', 400);
    return this.repository.findOneBy({ username });
  }
  createUser(input: SignupInput): Promise<User> {
    const user = this.repository.create(input);
    user.username = user.email;
    return this.repository.save(user);
  }
}
