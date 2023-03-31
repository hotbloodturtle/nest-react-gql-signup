import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { createContainer } from "unstated-next";
import { graphql } from "../../gql";
import { SigninInput } from "../../gql/graphql";

const signinDoc = graphql(`
  mutation Signin($input: SigninInput!) {
    signin(input: $input) {
      accessToken
    }
  }
`);

const signinContainer = createContainer(() => {
  const [mutation] = useMutation(signinDoc);
  const signin = (input: SigninInput) => {
    mutation({
      variables: { input },
      onCompleted: (data) => {
        console.log("signin completed", data);
      },
      onError: (error) => {
        console.log("signin error", error);
      },
    });
  };
  return { signin };
});

const ContentSignin = () => {
  const { signin } = signinContainer.useContainer();
  const { register, handleSubmit } = useForm<SigninInput>();
  return (
    <form onSubmit={handleSubmit(signin)}>
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
      <button>Signin</button>
    </form>
  );
};

const PageSignin = () => {
  return (
    <signinContainer.Provider>
      <ContentSignin />
    </signinContainer.Provider>
  );
};

export default PageSignin;
