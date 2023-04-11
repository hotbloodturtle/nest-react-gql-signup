import { Query, Resolver } from '@nestjs/graphql';

import { UseGuards } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from '../auth/auth.decorator';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  whoAmI(@CurrentUser() user: User): Promise<User> {
    return this.usersService.findOne(user.username);
  }
}
