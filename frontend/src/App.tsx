import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageHome from "./pages";
import Page404 from "./pages/404";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PageHome />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
