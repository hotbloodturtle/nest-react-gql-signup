import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SigninInput, SignupInput } from './users.dto';
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
  findOne(id: number): Promise<User> {
    return this.repository.findOneBy({ id });
  }
  signup(input: SignupInput): Promise<User> {
    const user = this.repository.create(input);
    return this.repository.save(user);
  }
  async signin(input: SigninInput): Promise<User> {
    const user = await this.repository.findOneBy({ email: input.email });
    if (user && user.compoarePassword(input.password)) {
      return user;
    }
  }
}
