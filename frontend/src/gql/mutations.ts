import { graphql } from "./generated";

export const SigninMutationDocument = graphql(`
  mutation Signin($input: SigninInput!) {
    signin(input: $input) {
      accessToken
    }
  }
`);

export const SignupMutationDocument = graphql(`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      accessToken
      refreshToken
    }
  }
`);

export const KaKaoSigninMutationDocument = graphql(`
  mutation KakaoSignin($code: String!) {
    kakaoSignin(code: $code) {
      accessToken
      refreshToken
    }
  }
`);
