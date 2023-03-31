import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { User } from '../users/users.entity';
import { SigninInput, SignupInput } from './auth.dto';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  signup(@Args('input') input: SignupInput): Promise<User> {
    return this.authService.signup(input);
  }

  @Mutation(() => User, { nullable: true })
  signin(@Args('input') input: SigninInput): Promise<User> {
    return this.authService.signin(input);
  }
}
