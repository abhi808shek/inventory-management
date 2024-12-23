import { DollarSign, File, House, ListChecks, LucideIcon } from "lucide-react";

export type OPTION_TYPE = {
  label: string;
  path: string;
  Icon: LucideIcon | null;
  children: null | OPTION_TYPE[];
};

export const sidebarOptions: OPTION_TYPE[] = [
  { label: "Dashboard", path: "/dashboard", Icon: House, children: null },
  { label: "Items", path: "/items", Icon: ListChecks, children: null },
  {
    label: "Workflows",
    path: "/workflows",
    Icon: House,
    children: [
      {
        label: "Purchase Orders",
        path: "/purchase_orders",
        Icon: null,
        children: null,
      },
      { label: "Invoices", path: "/invoices", Icon: null, children: null },
      { label: "Challan", path: "/challan", Icon: null, children: null },
    ],
  },
  { label: "Ledger", path: "/ledger", Icon: House, children: null },
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
      { label: "Users", path: "/users", Icon: null, children: null },
      { label: "Roles", path: "/roles", Icon: null, children: null },
    ],
  },
];
