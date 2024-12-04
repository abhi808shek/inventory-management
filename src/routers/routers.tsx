import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
const routers = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route />
      </Routes>
    </Suspense>
  );
};

export default routers;
