import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SigninInput, SignupInput } from './users.dto';
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
  user(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  signup(@Args('input') input: SignupInput): Promise<User> {
    return this.usersService.signup(input);
  }

  @Mutation(() => User, { nullable: true })
  signin(@Args('input') input: SigninInput): Promise<User> {
    return this.usersService.signin(input);
  }
}
