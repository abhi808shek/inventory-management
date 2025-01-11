import {
  DynamicTableHeaderApi,
  DynamicUserTableDataApi,
} from "@/api/table.api";
import DynamicTable from "@/components/dynamicTable";
import SearchTable from "@/components/search-table";
import useApi from "@/hooks/useApi";
import {
  dynamicTableDataList,
  dynamicTableHeaderList,
} from "@/store/dynamicTable/dynamic-table-reducer";
import handleAsync from "@/utils/handleAsync";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../style.module.css";
import ViewSettings from "@/components/ViewSettings";

const Roles = () => {
  const [viewSettingMode, setViewSettingMode] = useState(false);
  const { dynamictableHeader } = useSelector(
    (state: any) => state.dynamictableHeader
  );
  const dispatch = useDispatch();

  // Dynamic Table Header API Fetcher Function
  const dynamicTableHeaderFunction = handleAsync(async () => {
    const res = await DynamicTableHeaderApi("ROLE-LIST");
    dispatch(dynamicTableHeaderList(res.data?.data ?? null));
    return res;
  });
  const colsFormat =
    dynamictableHeader?.table_top?.buttons?.menu?.columns?.all_cols;

  const { execute: dynamicDataHeaderFetcher } = useApi(
    dynamicTableHeaderFunction
  );
  // Dynamic Table Data API Fetcher Function
  const dynamicUserTableDataFunction = handleAsync(async () => {
    const res = await DynamicUserTableDataApi("user-role");
    dispatch(dynamicTableDataList(res.data?.data ?? null));
    return res;
  });

  const { execute: dynamicUserDataTableFetcher } = useApi(
    dynamicUserTableDataFunction
  );
  useEffect(() => {
    dynamicDataHeaderFetcher();
    dynamicUserDataTableFetcher();
  }, []);

  return (
    <div className=" w-full h-full flex overflow-hidden gap-2">
      {/* Left Table Sections */}
      <div className={`leftTable h-max max-h-[92%] w-full overflow-x-auto`}>
        <div className="bg-white h-full w-full rounded-lg ">
          <SearchTable
            setViewSettingMode={setViewSettingMode}
            viewSettingMode={viewSettingMode}
            styles={styles}
            dynamictableHeader={dynamictableHeader}
          />

          <div className="w-full overflow-x-auto">
            <DynamicTable colsData={colsFormat} data={[]} />
          </div>
        </div>
      </div>
      {/* View Setting Pannel or Sections */}
      {viewSettingMode && (
        <ViewSettings
          dynamictableHeader={dynamictableHeader}
          setViewSettingMode={setViewSettingMode}
        />
      )}
    </div>
  );
};

export default Roles;
