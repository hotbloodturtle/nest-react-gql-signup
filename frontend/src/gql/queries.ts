import { graphql } from "./generated";

export const WhoAmIQueryDocument = graphql(`
  query whoAmI {
    whoAmI {
      id
      name
    }
  }
`);
