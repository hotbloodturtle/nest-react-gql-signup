import { Injectable } from '@nestjs/common';
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
  findAll(): Promise<User[]> {
    return this.repository.find();
  }
  findOne(email: string): Promise<User> {
    return this.repository.findOneBy({ email });
  }
  createUser(input: SignupInput): Promise<User> {
    const user = this.repository.create(input);
    return this.repository.save(user);
  }
}
