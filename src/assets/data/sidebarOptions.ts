import HOME_ICON from "../images/Home_ICON.svg";
import THREE_LINE_BAR from "../images/three_line_bar.svg";
import DOLLAR_ICON from "../images/Dollar_ICON.svg";
import FILE_ICON from "../images/FILE_ICON.svg";

export type OPTION_TYPE = {
  label: string;
  path: string;
  icon: string | null;
  children: null | OPTION_TYPE[];
};

export const sidebarOptions: OPTION_TYPE[] = [
  { label: "Dashboard", path: "/dashboard", icon: HOME_ICON, children: null },
  { label: "Items", path: "/items", icon: HOME_ICON, children: null },
  {
    label: "Workflows",
    path: "/workflows",
    icon: THREE_LINE_BAR,
    children: [
      {
        label: "Purchase Orders",
        path: "/purchase_orders",
        icon: null,
        children: null,
      },
      { label: "Invoices", path: "/invoices", icon: null, children: null },
      { label: "Challan", path: "/challan", icon: null, children: null },
    ],
  },
  { label: "Ledger", path: "/ledger", icon: HOME_ICON, children: null },
  {
    label: "Reports",
    path: "/reports",
    icon: DOLLAR_ICON,
    children: [
      {
        label: "Activity History",
        path: "/activity_history",
        icon: null,
        children: null,
      },
      { label: "Low Stock", path: "/low_stock", icon: null, children: null },
      {
        label: "Transactions",
        path: "/transactions",
        icon: null,
        children: null,
      },
    ],
  },
  {
    label: "Access Control",
    path: "/access_control",
    icon: FILE_ICON,
    children: [
      { label: "Users", path: "/users", icon: null, children: null },
      { label: "Roles", path: "/roles", icon: null, children: null },
    ],
  },
];
