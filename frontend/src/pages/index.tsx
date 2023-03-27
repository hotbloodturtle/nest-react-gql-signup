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
  console.log(data);
  return (
    <div>
      <h1>Home</h1>
      <p>Home page</p>
      <p>Home page</p>
    </div>
  );
};

export default PageHome;
