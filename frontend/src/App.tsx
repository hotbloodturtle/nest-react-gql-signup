import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageHome from "./pages";
import Page404 from "./pages/404";
import PageAdminHome from "./pages/admin";
import PageSignin from "./pages/signin";
import PageSignup from "./pages/signup";

function App() {
  const client = new ApolloClient({
    uri: `${import.meta.env.DEV ? "http://localhost:8000" : ""}/graphql`,
    cache: new InMemoryCache(),
    credentials: "include",
  });
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          {/* user */}
          <Route path="/" element={<PageHome />} />
          <Route path="/signin" element={<PageSignin />}></Route>
          <Route path="/signup" element={<PageSignup />}></Route>

          {/* admin */}
          <Route path="/admin" element={<PageAdminHome />}></Route>

          {/* 404 */}
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
