import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { User } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { CurrentUser, GqlAuthGuard, GraphqlResponse } from './auth.decorator';
import { SigninInput, SignupInput, TokenType } from './auth.dto';
import { Verification } from './auth.entity';
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
  async signin(
    @Args('input') input: SigninInput,
    @GraphqlResponse() res: Response,
  ): Promise<TokenType> {
    const token = await this.authService.signin(input);
    if (token) {
      res.cookie('refreshToken', token.refreshToken, {
        httpOnly: true,
        secure: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
        sameSite: 'none',
      });
    }
    return this.authService.signin(input);
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  whoAmI(@CurrentUser() user: User): Promise<User> {
    return this.usersService.findOne(user.email);
  }

  @Query(() => [Verification])
  verifications(): Promise<Verification[]> {
    return this.authService.verifications();
  }
}
