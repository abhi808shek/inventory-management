import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

//pages
const Home = lazy(() => import("../pages/home"));

const Routers = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Suspense>
  );
};

export default Routers;
