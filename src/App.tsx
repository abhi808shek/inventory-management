import Routers from "./routers/routers";
import ErrorBoundary from "./components/ErrorBoundary";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { getUserData } from "@/api/user.api";
import "./App.css";
import { setUserData } from "./store/user/user-reducer";

const App = () => {
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: getUserData,
    onSuccess: (data: any) => {
      console.log("Get Fetchjed Data", data);

      setUserData(data); // Update global state
    },
    onError: (error: any) => {
      console.log("Errror ", error);

      // toast.error(error.message);
    },
  });
  console.log("FTexhed Data", data);

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
