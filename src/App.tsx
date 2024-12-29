import Routers from "./routers/routers";
import ErrorBoundary from "./components/ErrorBoundary";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserData } from "@/api/user.api";
import LoadingComponent from "@/components/Loading";
import "./App.css";
import { setUserData } from "./store/user/user-reducer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const App = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUserData,
    enabled: false,
    staleTime: Infinity,
  });

  const dispatch = useDispatch();

  dispatch(setUserData(data?.data ?? null));

  return (
    <ErrorBoundary>
      <Toaster />
      <BrowserRouter>
        {isLoading ? (
          <div className="w-full h-[100svh] flex items-center justify-center">
            <LoadingComponent />
          </div>
        ) : (
          <Routers />
        )}
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
