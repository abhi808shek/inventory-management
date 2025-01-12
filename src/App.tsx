import Routers from "./routers/routers";
import RemoveTrailingSlash from "@/components/RemoveSlashFromURl";
import ErrorBoundary from "./components/ErrorBoundary";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";

const App = () => {
  return (
    <ErrorBoundary>
      <Toaster />
      <BrowserRouter>
        <RemoveTrailingSlash />
        <Routers />
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
