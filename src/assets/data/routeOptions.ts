import { lazy } from "react";

// Users routes Page
const Users = lazy(() => import("@/pages/users/index.tsx"));

// Roles routes Page
const Roles = lazy(() => import("@/pages/roles"));

// Items routes Page
const Items = lazy(() => import("@/pages/items"));
const AddItems = lazy(() => import("@/pages/addItem"));

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
    addComponent: AddItems,
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
  "/roles/add": "ROLE-ADD",
  "/roles": "ROLE-LIST",
  "/roles/update": "ROLE-UPDATE",
  "/items/add": "ITEM-ADD",
  "/items": "ITEM-LIST",
  "/items/update": "ITEM-UPDATE",
  "/users/add": "USER-ADD",
  "/users": "USER-LIST",
  "/users/update": "USER-UPDATE",
  "/purchase-orders/add": "PO-ADD",
  "/purchase-orders": "PO-LIST",
  "/purchase-orders/update": "PO-UPDATE",
  "/invoicing/add": "INVOICE-ADD",
  "/invoicing": "INVOICE-LIST",
  "/invoicing/update": "INVOICE-UPDATE",
  "/challan/add": "CHALLAN-ADD",
  "/challan": "CHALLAN-LIST",
  "/challan/update": "CHALLAN-UPDATE",
};
