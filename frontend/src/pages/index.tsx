import { gql, useQuery } from "@apollo/client";

const PageHome = () => {
  const { data } = useQuery(gql`
    query {
      users {
        id
        name
        createdAt
      }
    }
  `);
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
