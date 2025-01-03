import React from "react";
import DynamicFormTable from "../../components/dynamic-form-table";
// import styles from "./style.module.css";
import SearchTable from "../../components/search-table";
const Workflow = () => {
  return (
    <div className=" w-full h-full flex overflow-hidden">
      {/* Left Table Sections */}
      <div className={`leftTable h-max max-h-[92%] w-full overflow-x-auto`}>
        <div className="bg-white h-full w-full rounded-lg ">
          <SearchTable
          // setViewSettingMode={setViewSettingMode}
          // viewSettingMode={viewSettingMode}
          // styles={styles}
          />
          <div className="w-full overflow-x-auto">
            <DynamicFormTable
              colsData={["View", "Create", "Modify", "Delete"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workflow;
