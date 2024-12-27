import BaseLayout from "@/layout/base";
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

//Routes
import PrivateRoute from "../routers/PrivateRoute";
import PublicRoute from "../routers/PublicRoute";

// Layouts
const AuthLayout = lazy(() => import("@/layout/auth"));

//Pages
const LoginPage = lazy(() => import("@/pages/login"));
const SignupPage = lazy(() => import("@/pages/signup"));
const NotFound = lazy(() => import("@/pages/notfound"));
// const Home = lazy(() => import("@/pages/home"));
const Dashboard = lazy(() => import("@/pages/dashboard"));

const Routers = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>
        </Route>
        <Route element={<PrivateRoute />}>
          <Route element={<BaseLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Routers;
