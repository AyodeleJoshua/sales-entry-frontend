import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/Header";
import Detail from "./components/Detail";
import Title from "./components/Title";
import "./styles.scss";

const queryClient = new QueryClient();
const App = () => (
  <div className="app">
    <QueryClientProvider client={queryClient}>
      <Title />
      <Header />
      <Detail />
    </QueryClientProvider>
  </div>
);

export default App;
