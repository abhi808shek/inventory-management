import Routers from "./routers/routers";
import ErrorBoundary from "./components/ErrorBoundary";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { getUserData } from "@/api/user.api";
import LoadingComponent from "@/components/Loading";
import { setUserData } from "./store/user/user-reducer";
import { useDispatch } from "react-redux";
import useApi from "@/hooks/useApi";
import handleAsync from "@/utils/handleAsync";
import "./App.css";
import { useEffect } from "react";

const App = () => {
  const dispatch = useDispatch();

  const fetchUser = handleAsync(async () => {
    const res = await getUserData();
    console.log("res", res);
    dispatch(setUserData(res.data?.data ?? null));
    return res;
  });

  const { pending, execute } = useApi(fetchUser);

  useEffect(() => {
    execute();
  }, []);

  return (
    <ErrorBoundary>
      <Toaster />
      <BrowserRouter>
        {pending ? (
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
