import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Layouts
const AuthLayout = lazy(() => import("@/layout/AuthLayout"));

//Pages
const LoginPage = lazy(() => import("@/pages/login"));
const SignupPage = lazy(() => import("@/pages/signup"));
const Routers = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Routers;
