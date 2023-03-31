import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UseGuards } from '@nestjs/common';
import { User } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { CurrentUser, GqlAuthGuard } from './auth.decorator';
import { SigninInput, SignupInput, TokenType } from './auth.dto';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Mutation(() => User)
  signup(@Args('input') input: SignupInput): Promise<User> {
    return this.authService.signup(input);
  }

  @Mutation(() => TokenType, { nullable: true })
  signin(@Args('input') input: SigninInput): Promise<TokenType> {
    return this.authService.signin(input);
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  whoAmI(@CurrentUser() user: User): Promise<User> {
    return this.usersService.findOne(user.email);
  }
}
