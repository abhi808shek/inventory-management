import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";

interface Item {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  name: string;
  country: number;
  phone_code: string;
  mobile_number: string;
  user_role: string;
  status: number;
  status_name: string;
  role: {
    id: number;
    name: string;
  };
  // Add other fields if necessary
}

// Static column definitions (all_cols)
const allCols = [
  {
    config: {
      key: ["name", "email"],
      type: "multi_row",
      values: [
        {
          label: "",
          value: {
            key: "name",
            link: "/user/[1]",
            type: "link",
            linkParams: ["id"],
          },
        },
        {
          label: "",
          value: {
            key: "email",
            type: "data",
            variant: "light",
          },
        },
      ],
    },
    headerName: "User",
    defaultLabel: "User",
    personalisedKey: "[users]",
  },
  {
    config: {
      key: "mobile_number",
      type: "data",
      variant: "light",
    },
    headerName: "Contact",
  },
  {
    config: {
      key: "role.name",
      link: "/roles/[1]",
      type: "link",
      linkParams: ["role.id"],
    },
    headerName: "Role",
    defaultLabel: "Role",
    personalisedKey: "[group]",
  },
  {
    config: {
      key: "status_name",
      type: "status",
    },
    headerName: "Status",
  },
];

// Sample data
const sampleData = [
  {
    id: 227,
    first_name: "",
    last_name: "",
    email: "rajesh.c@auromining.com",
    name: "Mr. Rajesh Choudhary",
    country: 103,
    phone_code: "+91",
    mobile_number: "7666877399",
    user_role: "Dashboard user || Auro Infra Private Limited",
    status: 1,
    status_name: "Active",
    role_type_id: 162,
    role: {
      id: 162,
      name: "Dashboard user || Auro Infra Private Limited",
      is_global: 0,
      is_super_admin: 0,
      is_company_admin: 0,
    },
  },
  {
    id: 208,
    first_name: "",
    last_name: "",
    email: "ravi.tiwari@instadigin.com",
    name: "Ravi Tiwari",
    country: 103,
    phone_code: "+91",
    mobile_number: "1234567098",
    user_role: "ADMIN || Auro Infra Private Limited",
    status: 1,
    status_name: "Active",
    role_type_id: 153,
    role: {
      id: 153,
      name: "ADMIN || Auro Infra Private Limited",
      is_global: 0,
      is_super_admin: 0,
      is_company_admin: 1,
    },
  },
  {
    id: 225,
    first_name: "",
    last_name: "",
    email: "gaurav.jain+aurotest@aurigait.com",
    name: "Gaurav Jain",
    country: 103,
    phone_code: "+91",
    mobile_number: "7455464356",
    user_role: "User || Auro Infra Private Limited",
    status: 1,
    status_name: "Active",
    role_type_id: 156,
    role: {
      id: 156,
      name: "User || Auro Infra Private Limited",
      is_global: 0,
      is_super_admin: 0,
      is_company_admin: 0,
    },
  },
  {
    id: 228,
    first_name: "",
    last_name: "",
    email: "satyanarayan.m@auromining.com",
    name: "Mr. Satyanarayan Meena",
    country: 103,
    phone_code: "+91",
    mobile_number: "9999660022",
    user_role: "Dashboard user || Auro Infra Private Limited",
    status: 1,
    status_name: "Active",
    role_type_id: 162,
    role: {
      id: 162,
      name: "Dashboard user || Auro Infra Private Limited",
      is_global: 0,
      is_super_admin: 0,
      is_company_admin: 0,
    },
  },
];

const DynamicTable = () => {
  function resolveNestedKey(obj: any, key: string): any {
    return key.split(".").reduce((acc, part) => acc && acc[part], obj);
  }

  return (
    <Table>
      <TableCaption>
        A dynamic table based on the provided configuration.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px] text-center">S.NO</TableHead>
          {allCols.map((col, index) => (
            <TableHead key={index}>{col.headerName}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleData.map((item: Item, index) => (
          <TableRow key={index}>
            <TableCell className="text-center">{index + 1}</TableCell>
            {allCols.map((col, colIndex) => {
              const config = col.config;

              // Multi-row data handling (e.g., User column)
              if (config.type === "multi_row") {
                return (
                  <TableCell key={colIndex}>
                    {config?.values?.map((value, valueIndex) => {
                      const key = value.value.key;
                      const data = item[key];

                      if (value.value.type === "link" && value?.value?.link) {
                        const link = value.value.link.replace(
                          "[1]",
                          item.id.toString()
                        );
                        return (
                          <div key={valueIndex}>
                            <Link
                              to={link}
                              className="font-medium text-blue-600 hover:underline"
                            >
                              {data}
                            </Link>
                          </div>
                        );
                      } else {
                        return (
                          <div
                            key={valueIndex}
                            className="text-sm text-gray-500"
                          >
                            {data}
                          </div>
                        );
                      }
                    })}
                  </TableCell>
                );
              }

              // Simple data rendering (e.g., Contact, Status)
              if (
                config.type === "data" &&
                config.key &&
                !Array.isArray(config.key)
              ) {
                const cellValue = resolveNestedKey(item, config.key);

                // If the column has a link configuration
                if (config.link) {
                  const link = config.link.replace(
                    "[1]",
                    resolveNestedKey(item, config.linkParams?.[0]) || ""
                  );
                  return (
                    <TableCell key={colIndex}>
                      <a href={link} className="text-blue-500 underline">
                        {cellValue || "-"}
                      </a>
                    </TableCell>
                  );
                }

                // Render plain data
                return <TableCell key={colIndex}>{cellValue || "-"}</TableCell>;
              }

              // Link data rendering (e.g., Role, Project)
              if (
                (config.type === "link" || config.type === "dataArray") &&
                config.link
              ) {
                const link = config.link?.replace(
                  "[1]",
                  item[config.linkParams[0] as keyof typeof item] || item.id
                );
                console.log("config.key", config.key);
                const data = config.key.includes(".")
                  ? resolveNestedKey(item, config.key)
                  : item[config.key];
                return (
                  <TableCell key={colIndex}>
                    <Link to={link} className="text-blue-600 hover:underline">
                      {data.name || data}
                    </Link>
                  </TableCell>
                );
              }

              // Status handling
              if (config.type === "status") {
                return (
                  <TableCell key={colIndex}>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded">
                      {item[config.key]}
                    </span>
                  </TableCell>
                );
              }

              return <TableCell key={colIndex}>-</TableCell>;
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DynamicTable;
