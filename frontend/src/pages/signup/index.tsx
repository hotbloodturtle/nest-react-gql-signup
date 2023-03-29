import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";

import { createContainer } from "unstated-next";
import { graphql } from "../../gql";
import { SignupInput } from "../../gql/graphql";

const signupMutationDocument = graphql(`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      email
      name
    }
  }
`);

const SignupContainer = createContainer(() => {
  const [mutation] = useMutation(signupMutationDocument);
  const signup = (input: SignupInput) => {
    mutation({
      variables: { input },
      onCompleted: (data) => {
        console.log("signup completed", data);
      },
      onError: (error) => {
        console.log("signup error", error);
      },
    });
  };
  return { signup };
});

const ContentSignUp = () => {
  const { register, handleSubmit } = useForm<SignupInput>();
  const { signup } = SignupContainer.useContainer();
  return (
    <form onSubmit={handleSubmit(signup)}>
      <input
        type="text"
        placeholder="email"
        {...register("email", { required: true })}
      />
      <input
        type="password"
        placeholder="password"
        {...register("password", { required: true })}
      />
      <input
        type="text"
        placeholder="name"
        {...register("name", { required: true })}
      />
      <button>Signup</button>
    </form>
  );
};

const PageSignup = () => {
  return (
    <SignupContainer.Provider>
      <ContentSignUp />
    </SignupContainer.Provider>
  );
};

export default PageSignup;
