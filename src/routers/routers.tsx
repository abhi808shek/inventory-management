import BaseLayout from "@/layout/base";
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ROUTE_OPTIONS } from "@/assets/data/routeOptions";

//Routes
import PrivateRoute from "@/routers/PrivateRoute";
import PublicRoute from "@/routers/PublicRoute";

// Layouts
const AuthLayout = lazy(() => import("@/layout/auth"));

//Pages
const LoginPage = lazy(() => import("@/pages/login"));
const SignupPage = lazy(() => import("@/pages/signup"));
const NotFound = lazy(() => import("@/pages/notfound"));
const Notifications = lazy(() => import("@/pages/notifications"));
const Permissions = lazy(() => import("@/pages/permissions"));

// Users routes Page
const AddForm = lazy(() => import("@/pages/addForm"));
const UpdateForm = lazy(() => import("@/pages//updateForm"));

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
            {ROUTE_OPTIONS?.map(
              ({ component: Component, mainRoute }: any, index: number) => (
                <Route path={mainRoute} key={index}>
                  <Route index element={<Component />} />
                  <Route path="add" element={<AddForm />} />
                  <Route path="update/:id" element={<UpdateForm />} />
                </Route>
              )
            )}
            <Route path="/permissions">
              <Route index element={<Permissions />} />
            </Route>
            <Route path="/notifications">
              <Route index element={<Notifications />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Routers;
