import Routers from "./routers/routers";
import ErrorBoundary from "./components/ErrorBoundary";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { getUserData } from "@/api/user.api";
import "./App.css";
import { setUserData } from "./store/user/user-reducer";
import { useDispatch } from "react-redux";

const App = () => {
  const userDeatils = useQuery({ queryKey: ["user"], queryFn: getUserData });

  const dispatch = useDispatch();

  dispatch(setUserData(userDeatils.data?.data ?? null));

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
