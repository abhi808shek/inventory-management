import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
const Routers = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route />
      </Routes>
    </Suspense>
  );
};

export default Routers;
