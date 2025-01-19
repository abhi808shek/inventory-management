import {
  DynamicTableHeaderApi,
  DynamicWorkflowTableDataApi,
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

const Challan = () => {
  const [viewSettingMode, setViewSettingMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { dynamictableHeader, dynamicTableData } = useSelector(
    (state: any) => state.dynamictableHeader
  );
  const dispatch = useDispatch();

  // Dynamic Table Header API Fetcher Function
  const dynamicTableHeaderFunction = handleAsync(
    async (key: string, value: boolean) => {
      const res = await DynamicTableHeaderApi("CHALLAN-LIST", key, value);
      dispatch(dynamicTableHeaderList(res.data?.data ?? null));
      return res;
    }
  );
  const colsFormat =
    dynamictableHeader?.table_top?.buttons?.menu?.columns?.all_cols;
  const { execute: dynamicDataHeaderFetcher } = useApi(
    dynamicTableHeaderFunction
  );

  // Dynamic Table Data API Fetcher Function
  const dynamicWorkflowTableDataFunction = handleAsync(
    async (colName = "", sortingType = "", searchInput = "") => {
      const res = await DynamicWorkflowTableDataApi(
        "challan-order",
        currentPage,
        colName as any,
        sortingType as any,
        searchInput as any
      );
      dispatch(dynamicTableDataList(res.data?.data ?? null));
      return res;
    }
  );

  const { execute: dynamicWorkflowDataTableFetcher } = useApi(
    dynamicWorkflowTableDataFunction
  );
  useEffect(() => {
    dynamicDataHeaderFetcher();
    dynamicWorkflowDataTableFetcher();
  }, []);
  return (
    <div className=" w-full h-full flex overflow-hidden">
      {/* Left Table Sections */}
      <div className={`leftTable h-max max-h-[92%] w-full overflow-x-auto`}>
        <div className="bg-white h-full w-full rounded-lg ">
          <SearchTable
            setViewSettingMode={setViewSettingMode}
            viewSettingMode={viewSettingMode}
            styles={styles}
            dynamictableHeader={dynamictableHeader}
            tableDataHandle={dynamicWorkflowDataTableFetcher}
          />
          <div className="w-full overflow-x-auto">
            <DynamicTable
              colsData={colsFormat}
              data={dynamicTableData?.results}
              count={dynamicTableData.count}
              prevUrl={dynamicTableData.previous}
              nextUrl={dynamicTableData.next}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              tableDataHandle={dynamicWorkflowDataTableFetcher}
            />
          </div>
        </div>
      </div>
      {/* View Setting Pannel or Sections */}
      {viewSettingMode && (
        <ViewSettings
          dynamictableHeader={dynamictableHeader}
          setViewSettingMode={setViewSettingMode}
          all_cols={colsFormat}
          // tableDataHandle={dynamicUserDataTableFetcher}
          tableHeaderHandler={dynamicDataHeaderFetcher}
        />
      )}
    </div>
  );
};

export default Challan;
