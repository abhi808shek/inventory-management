import BaseLayout from "@/layout/base";
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

//Routes
import PrivateRoute from "@/routers/PrivateRoute";
import PublicRoute from "@/routers/PublicRoute";

// Layouts
const AuthLayout = lazy(() => import("@/layout/auth"));

//Pages
const LoginPage = lazy(() => import("@/pages/login"));
const SignupPage = lazy(() => import("@/pages/signup"));
const NotFound = lazy(() => import("@/pages/notfound"));
// const Home = lazy(() => import("@/pages/home"));
const Users = lazy(() => import("@/pages/users"));
const Roles = lazy(() => import("@/pages/roles"));
const Notifications = lazy(() => import("@/pages/notifications"));
const Permissions = lazy(() => import("@/pages/permissions"));
const Items = lazy(() => import("@/pages/items"));
const PurchaseOrders = lazy(() => import("@/pages/purchaseOrders"));
const Invoicing = lazy(() => import("@/pages/invoices"));
const Challan = lazy(() => import("@/pages/challan"));
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
            {/* <Route index element={<Dashboard />} /> */}
            <Route path="/roles">
              <Route index element={<Roles />} />
            </Route>
            <Route path="/items">
              <Route index element={<Items />} />
            </Route>
            <Route path="/users">
              <Route index element={<Users />} />
            </Route>
            <Route path="/permissions">
              <Route index element={<Permissions />} />
            </Route>
            <Route path="/purchase-orders">
              <Route index element={<PurchaseOrders />} />
            </Route>
            <Route path="/invoicing">
              <Route index element={<Invoicing />} />
            </Route>
            <Route path="/challan">
              <Route index element={<Challan />} />
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
