import { useQuery } from "@apollo/client";
import { graphql } from "../../gql";
import LayoutAdmin from "./LayoutAdmin";

const whoAmI = graphql(`
  query whoAmI {
    whoAmI {
      id
      name
    }
  }
`);

const PageAdminHome = () => {
  const { data } = useQuery(whoAmI);
  return (
    <LayoutAdmin>
      <div>admin home</div>
      <p>{JSON.stringify(data)}</p>
    </LayoutAdmin>
  );
};

export default PageAdminHome;
