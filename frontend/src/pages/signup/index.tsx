import { useMutation } from "@apollo/client";
import { useState } from "react";

import { createContainer } from "unstated-next";
import { graphql } from "../../gql";

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
  const [fields, setFields] = useState<{
    email: string;
    password: string;
    name: string;
  }>({
    email: "",
    password: "",
    name: "",
  });
  const signup = () => {
    console.log(fields);
    mutation({
      variables: { input: { email: "test", password: "test", name: "test" } },
      onCompleted: (data) => {
        console.log("signup completed", data);
      },
      onError: (error) => {
        console.log("signup error", error);
      },
    });
  };
  return { signup, fields, setFields };
});

const ContentSignUp = () => {
  const { signup, fields, setFields } = SignupContainer.useContainer();
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="email"
        value={fields.email}
        onChange={(e) => setFields({ ...fields, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="password"
        value={fields.password}
        onChange={(e) => setFields({ ...fields, password: e.target.value })}
      />
      <input
        type="text"
        placeholder="name"
        value={fields.name}
        onChange={(e) => setFields({ ...fields, name: e.target.value })}
      />
      <button onClick={signup}>Signup</button>
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
