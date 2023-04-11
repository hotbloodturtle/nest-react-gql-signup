import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class SignupInput {
  @Field()
  email: string;

  @Field({ nullable: true })
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

  @Field()
  refreshToken: string;
}
