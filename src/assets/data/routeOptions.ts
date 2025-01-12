import { lazy } from "react";

// Users routes Page
const Users = lazy(() => import("@/pages/users/index.tsx"));

// Roles routes Page
const Roles = lazy(() => import("@/pages/roles"));

// Items routes Page
const Items = lazy(() => import("@/pages/items"));

// Purchase Orders routes Page
const PurchaseOrders = lazy(() => import("@/pages/purchaseOrders"));

// Invoicing routes Page
const Invoicing = lazy(() => import("@/pages/invoicing"));

// Challan routes Page
const Challan = lazy(() => import("@/pages/challan"));

// Permissions routes Page
const Permissions = lazy(() => import("@/pages/permissions"));

export const ROUTE_OPTIONS = [
  {
    mainRoute: "/users",
    component: Users,
  },
  {
    mainRoute: "/roles",
    component: Roles,
    addComponent: Permissions,
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
];

export const titleObj: any = {
  "/permissions": "ROLE-ADD",
  "/roles": "ROLE-LIST",
  "/roles/add": "ROLE-ADD",
  "/roles/update": "ROLE-UPDATE",
  "/items": "USER-ADD",
  "/items/add": "USER-ADD",
  "/items/update": "USER-UPDATE",
  "/users": "USER-LIST",
  "/users/add": "USER-ADD",
  "/users/update": "USER-UPDATE",
  "/purchase-orders": "PO-LIST",
  "/purchase-orders/add": "PO-ADD",
  "/purchase-orders/update": "PO-UPDATE",
  "/invoicing": "INVOICE-LIST",
  "/invoicing/add": "INVOICE-ADD",
  "/invoicing/update": "INVOICE-UPDATE",
  "/challan": "CHALLAN-LIST",
  "/challan/add": "CHALLAN-ADD",
  "/challan/update": "CHALLAN-UPDATE",
};
