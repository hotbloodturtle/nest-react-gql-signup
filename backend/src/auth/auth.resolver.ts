import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CookieOptions, Response } from 'express';
import { User } from '../users/users.entity';
import { GraphqlResponse } from './auth.decorator';
import { SigninInput, SignupInput, TokenType } from './auth.dto';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  cookieOptions: CookieOptions;

  constructor(private readonly authService: AuthService) {
    this.cookieOptions = {
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
      sameSite: 'none',
    };
  }

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
      res.cookie('accessToken', token.accessToken, this.cookieOptions);
      res.cookie('refreshToken', token.refreshToken, this.cookieOptions);
    }
    return token;
  }
}
