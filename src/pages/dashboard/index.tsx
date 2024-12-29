import { useState } from "react";
import DynamicTable from "@/components/dynamicTable";
import SearchTable from "@/components/search-table";
import styles from "./style.module.css";
import { AllColsType } from "@/types/tableDataType";

const allCols: AllColsType = [
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
    status_name: "Inactive",
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
    status_name: "Disabled",
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
    status_name: "Pending",
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

const Dashboard = () => {
  const [viewSettingMode, setViewSettingMode] = useState(false);
  return (
    <div className=" w-full h-full flex">
      {/* Left Table Sections */}
      <div className={`leftTable h-[90%] w-full overflow-x-auto`}>
        <div className="bg-white h-full w-full rounded-lg ">
          <SearchTable
            setViewSettingMode={setViewSettingMode}
            viewSettingMode={viewSettingMode}
            styles={styles}
          />
          <div>
            <DynamicTable colsData={allCols} data={sampleData} />
          </div>
        </div>
      </div>
      {/* View Setting Pannel or Sections */}
      {/* <div
        className={`viewSettings hidden h-[90%] sm:flex items-center justify-center  bg-blue-300 ${
          viewSettingMode ? "w-[30%]" : "hidden"
        }`}
      >
        <div className="w-[90%] h-[90%] bg-white rounded-lg border-[1px]">
          View Settings
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
