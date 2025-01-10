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
const Notifications = lazy(() => import("@/pages/notifications"));
const Permissions = lazy(() => import("@/pages/permissions"));

// Users routes Page
const Users = lazy(() => import("@/pages/users"));
const AddUser = lazy(() => import("@/pages/users/add"));
const UpdateUser = lazy(() => import("@/pages/users/update"));

// Roles routes Page
const Roles = lazy(() => import("@/pages/roles"));
const AddRole = lazy(() => import("@/pages/roles/add"));
const UpdateRole = lazy(() => import("@/pages/roles/update"));

// Items routes Page
const Items = lazy(() => import("@/pages/items"));
const AddItem = lazy(() => import("@/pages/items/add"));
const UpdateItem = lazy(() => import("@/pages/items/update"));

// Purchase Orders routes Page
const PurchaseOrders = lazy(() => import("@/pages/purchaseOrders"));
const AddPurchaseOrder = lazy(() => import("@/pages/purchaseOrders/add"));
const UpdatePurchaseOrder = lazy(() => import("@/pages/purchaseOrders/update"));

// Invoicing routes Page
const Invoicing = lazy(() => import("@/pages/invoicing"));
const AddInvoicing = lazy(() => import("@/pages/invoicing/add"));
const UpdateInvoicing = lazy(() => import("@/pages/invoicing/update"));

// Challan routes Page
const Challan = lazy(() => import("@/pages/challan"));
const AddChallan = lazy(() => import("@/pages/challan/add"));
const UpdateChallan = lazy(() => import("@/pages/challan/update"));

/*
const routes = [
  {
    path: "/role",
    mainComponent: <Roles />,
  }
]

routes.map(route => {
  <Route path={route.path}>
              <Route index element={route.mainComponent} />
              <Route path="add" element={<AddRole />} />
              <Route path="update" element={<UpdateRole />} />
            </Route>
})

*/

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
              <Route path="add" element={<AddRole />} />
              <Route path="update" element={<UpdateRole />} />
            </Route>
            <Route path="/items">
              <Route index element={<Items />} />
              <Route path="add" element={<AddItem />} />
              <Route path="update" element={<UpdateItem />} />
            </Route>
            <Route path="/users">
              <Route index element={<Users />} />
              <Route path="add" element={<AddUser />} />
              <Route path="update" element={<UpdateUser />} />
            </Route>
            <Route path="/permissions">
              <Route index element={<Permissions />} />
            </Route>
            <Route path="/purchase-orders">
              <Route index element={<PurchaseOrders />} />
              <Route path="update" element={<UpdatePurchaseOrder />} />
              <Route path="add" element={<AddPurchaseOrder />} />
            </Route>
            <Route path="/invoicing">
              <Route index element={<Invoicing />} />
              <Route path="add" element={<AddInvoicing />} />
              <Route path="update" element={<UpdateInvoicing />} />
            </Route>
            <Route path="/challan">
              <Route index element={<Challan />} />
              <Route path="add" element={<AddChallan />} />
              <Route path="update" element={<UpdateChallan />} />
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
