import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class SignupInput {
  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  password: string;
}

@InputType()
export class SigninInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
export class TokenType {
  @Field()
  accessToken: string;

  // @Field()
  // refresh_token: string;
}
