import Routers from "./routers/routers";
import ErrorBoundary from "./components/ErrorBoundary";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { getUserData } from "@/api/user.api";
import "./App.css";

const App = () => {
  const userDeatils = useQuery({ queryKey: ["user"], queryFn: getUserData });
  console.log("userDetails", userDeatils);

  return (
    <ErrorBoundary>
      <Toaster />
      <BrowserRouter>
        <Routers />
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
