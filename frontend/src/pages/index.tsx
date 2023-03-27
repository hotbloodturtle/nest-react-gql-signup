import { useQuery } from "@apollo/client";
import { graphql } from "../gql";

const users = graphql(`
  query users {
    users {
      id
      name
      createdAt
    }
  }
`);

const PageHome = () => {
  const { data } = useQuery(users);
  return (
    <div>
      <h1>Home</h1>
      <p>Home page</p>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
};

export default PageHome;
