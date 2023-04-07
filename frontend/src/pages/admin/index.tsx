import { useQuery } from "@apollo/client";
import LayoutAdmin from "./LayoutAdmin";
import { WhoAmIQueryDocument } from "../../gql/queries";

const PageAdminHome = () => {
  const { data } = useQuery(WhoAmIQueryDocument);
  return (
    <LayoutAdmin>
      <div>admin home</div>
      <p>{JSON.stringify(data)}</p>
    </LayoutAdmin>
  );
};

export default PageAdminHome;
