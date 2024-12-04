import { useEffect, useState } from "react";
import "./App.module.css";
import handleAsync from "./utils/handleAsync";
import Routers from "./routers/routers";
import ErrorBoundary from "./components/ErrorBoundary";

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
      <Routers />
    </ErrorBoundary>
  );
};

export default App;
