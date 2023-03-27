import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageHome from "./pages";
import Page404 from "./pages/404";
import PageAdminHome from "./pages/admin";
import PageSignin from "./pages/admin/signin";
import PageSignup from "./pages/admin/signup";

function App() {
  const client = new ApolloClient({
    uri: `${import.meta.env.LOCAL_URL ?? ""}/graphql`,
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageHome />} />

          <Route path="/admin" element={<PageAdminHome />}></Route>
          <Route path="/admin/signin" element={<PageSignin />}></Route>
          <Route path="/admin/signup" element={<PageSignup />}></Route>

          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
