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
  findOne(email: string): Promise<User> {
    if (!email) throw new HttpException('Email is required', 400);
    return this.repository.findOneBy({ email });
  }
  createUser(input: SignupInput): Promise<User> {
    const user = this.repository.create(input);
    return this.repository.save(user);
  }
}
