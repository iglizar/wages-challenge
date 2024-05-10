import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routers from "./routers/Routers";
import Layout from "./layouts";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <Router>
      <Layout>
        <QueryClientProvider client={queryClient}>
          <Routers />
        </QueryClientProvider>
      </Layout>
    </Router>
  );
}

export default App;
