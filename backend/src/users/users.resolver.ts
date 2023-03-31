import { Args, Query, Resolver } from '@nestjs/graphql';

import { User } from './users.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User)
  user(@Args('email', { type: () => String }) email: string): Promise<User> {
    return this.usersService.findOne(email);
  }
}
