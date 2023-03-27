import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageHome from "./pages";
import Page404 from "./pages/404";

function App() {
  const client = new ApolloClient({
    uri: "http://localhost:8000/graphql",
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageHome />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
