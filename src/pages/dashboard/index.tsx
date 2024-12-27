import UserRolesTable from "@/components/user-roles-table";
import styles from "./style.module.css";
import SearchTable from "@/components/search-table";
import { useState } from "react";
const Dashboard = () => {
  const [viewSettingMode, setViewSettingMode] = useState(false);
  return (
    <div className=" w-full h-full flex">
      {/* Left Table Sections */}
      <div className={`leftTable h-[90%] w-[90%] overflow-x-auto`}>
        <div className="bg-white h-full w-full rounded-lg ">
          <SearchTable
            setViewSettingMode={setViewSettingMode}
            viewSettingMode={viewSettingMode}
            styles={styles}
          />
          <div>
            <UserRolesTable />
          </div>
        </div>
      </div>
      {/* View Setting Pannel or Sections */}
      <div
        className={`viewSettings hidden h-[90%] sm:flex items-center justify-center  bg-blue-300 ${
          viewSettingMode ? "w-[30%]" : "hidden"
        }`}
      >
        <div className="w-[90%] h-[90%] bg-white rounded-lg border-[1px]">
          View Settings
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
