import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Users routes Page
const Users = lazy(() => import("@/pages/users/index.tsx"));
// const AddUser = lazy(() => import("@/pages/users/add"));
// const UpdateUser = lazy(() => import("@/pages/users/update"));

// Roles routes Page
const Roles = lazy(() => import("@/pages/roles"));
// const AddRole = lazy(() => import("@/pages/roles/add"));
// const UpdateRole = lazy(() => import("@/pages/roles/update"));

// Items routes Page
const Items = lazy(() => import("@/pages/items"));
// const AddItem = lazy(() => import("@/pages/items/add"));
// const UpdateItem = lazy(() => import("@/pages/items/update"));

// Purchase Orders routes Page
const PurchaseOrders = lazy(() => import("@/pages/purchaseOrders"));
// const AddPurchaseOrder = lazy(() => import("@/pages/purchaseOrders/add"));
// const UpdatePurchaseOrder = lazy(() => import("@/pages/purchaseOrders/update"));

// Invoicing routes Page
const Invoicing = lazy(() => import("@/pages/invoicing"));
// const AddInvoicing = lazy(() => import("@/pages/invoicing/add"));
// const UpdateInvoicing = lazy(() => import("@/pages/invoicing/update"));

// Challan routes Page
const Challan = lazy(() => import("@/pages/challan"));
// const AddChallan = lazy(() => import("@/pages/challan/add"));
// const UpdateChallan = lazy(() => import("@/pages/challan/update"));

export const ROUTE_OPTIONS = [
  {
    mainRoute: "/users",
    component: Users,
  },
  {
    mainRoute: "/roles",
    component: Roles,
  },
  {
    mainRoute: "/items",
    component: Items,
  },
  {
    mainRoute: "/purchase-orders",
    component: PurchaseOrders,
  },
  {
    mainRoute: "/invoicing",
    component: Invoicing,
  },
  {
    mainRoute: "/challan",
    component: Challan,
  },

  {
    mainRoute: "/challan",
    component: Challan,
  },
];
