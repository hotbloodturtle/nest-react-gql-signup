import { createContainer } from "unstated-next";
import { useQuery } from "@apollo/client";
import { WhoAmIQueryDocument } from "../gql/queries";

const PageHomeContainer = createContainer(() => {
  const { data: user } = useQuery(WhoAmIQueryDocument);
  return { user };
});

const PageHomeContent = () => {
  const { user } = PageHomeContainer.useContainer();
  return (
    <div>
      <h1>Home</h1>
      <p>Home page</p>
      <p>hi {user?.whoAmI?.name}</p>
    </div>
  );
};

const PageHome = () => {
  return (
    <PageHomeContainer.Provider>
      <PageHomeContent />
    </PageHomeContainer.Provider>
  );
};

export default PageHome;
