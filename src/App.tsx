import Routers from "./routers/routers";
import ErrorBoundary from "./components/ErrorBoundary";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
// import { useQuery } from "@tanstack/react-query";
import { getUserData } from "@/api/user.api";
import "./App.css";
import { setUserData } from "./store/user/user-reducer";
import { useEffect } from "react";

const App = () => {
  // const userDeatils = useQuery({ queryKey: ["user"], queryFn: getUserData });
  // console.log("userDetails", userDeatils);

  const resultFuunct = async () => {
    const result = await getUserData();
    setUserData(result.data.data);
  };

  useEffect(() => {
    resultFuunct();
  }, []);

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
