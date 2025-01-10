import {
  BriefcaseBusiness,
  Calculator,
  DollarSign,
  File,
  House,
  ListChecks,
  LucideIcon,
} from "lucide-react";

export type OPTION_TYPE = {
  label: string;
  path: string;
  Icon: LucideIcon | null;
  pageTitle?: string;
  children: null | OPTION_TYPE[];
};

export const sidebarOptions: OPTION_TYPE[] = [
  {
    label: "Dashboard",
    path: "/",
    Icon: House,
    children: null,
    pageTitle: "User",
  },
  {
    label: "Items",
    path: "/items",
    Icon: ListChecks,
    children: null,
    pageTitle: "Item",
  },
  {
    label: "Workflows",
    path: "/workflows",
    Icon: BriefcaseBusiness,
    pageTitle: "Workflows",
    children: [
      {
        label: "Purchase Orders",
        path: "/purchase-orders",
        Icon: null,
        children: null,
      },
      { label: "Invoices", path: "/invoicing", Icon: null, children: null },
      { label: "Challan", path: "/challan", Icon: null, children: null },
    ],
  },
  { label: "Ledger", path: "/ledger", Icon: Calculator, children: null },
  {
    label: "Reports",
    path: "/reports",
    Icon: DollarSign,
    children: [
      {
        label: "Activity History",
        path: "/activity_history",
        Icon: null,
        children: null,
      },
      { label: "Low Stock", path: "/low_stock", Icon: null, children: null },
      {
        label: "Transactions",
        path: "/transactions",
        Icon: null,
        children: null,
      },
    ],
  },
  {
    label: "Access Control",
    path: "/access_control",
    Icon: File,
    children: [
      {
        label: "Users",
        path: "/users",
        Icon: null,
        children: null,
        pageTitle: "User",
      },
      {
        label: "Roles",
        path: "/roles",
        Icon: null,
        children: null,
        pageTitle: "Role",
      },
    ],
  },
];
