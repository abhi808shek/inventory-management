import BaseLayout from "@/layout/base";
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ROUTE_OPTIONS } from "@/assets/data/routeOptions";

//Routes
import PrivateRoute from "@/routers/PrivateRoute";
import PublicRoute from "@/routers/PublicRoute";
import Dashboard from "@/pages/dashboard";

// Layouts
const AuthLayout = lazy(() => import("@/layout/auth"));

//Pages
const LoginPage = lazy(() => import("@/pages/login"));
const SignupPage = lazy(() => import("@/pages/signup"));
const NotFound = lazy(() => import("@/pages/notfound"));
const Notifications = lazy(() => import("@/pages/notifications"));
const AddOrUpdateUI = lazy(() => import("@/pages/items/add"));
const UpdateItem = lazy(() => import("@/pages/items/update"));

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
            <Route index element={<Dashboard />} />
            {ROUTE_OPTIONS?.map(
              (
                {
                  component: Component,
                  mainRoute,
                  addComponent: AddComponent,
                  hasCustomAddComponent,
                  hasCustomUpdateComponent,
                }: any,
                index: number
              ) => (
                <Route path={mainRoute} key={index}>
                  <Route index element={<Component />} />
                  {!hasCustomAddComponent ? (
                    <Route
                      path="add"
                      element={AddComponent ? <AddComponent /> : <AddForm />}
                    />
                  ) : null}
                  {!hasCustomUpdateComponent ? (
                    <Route path="update/:id" element={<UpdateForm />} />
                  ) : null}
                </Route>
              )
            )}
            <Route path="/items/add" element={<AddOrUpdateUI />} />
            <Route path="/items/update/:id" element={<UpdateItem />} />
            <Route path="/notifications">
              <Route index element={<Notifications />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Routers;
