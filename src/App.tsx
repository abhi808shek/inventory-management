import { useEffect, useState } from "react";
import handleAsync from "./utils/handleAsync";
import Routers from "./routers/routers";
import ErrorBoundary from "./components/ErrorBoundary";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  const [loading, setLoading] = useState(false);

  const onLoad = handleAsync(
    async () => {
      setLoading(true);
    },
    () => setLoading(false)
  );

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routers />
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
