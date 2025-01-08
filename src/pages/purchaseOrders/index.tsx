import { DynamicTableHeaderApi } from "@/api/table.api";
import DynamicTable from "@/components/dynamicTable";
import SearchTable from "@/components/search-table";
import useApi from "@/hooks/useApi";
import { dynamicTableHeaderList } from "@/store/dynamicTable/dynamic-table-reducer";
import handleAsync from "@/utils/handleAsync";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../style.module.css";
const PurchaseOrders = () => {
  const [viewSettingMode, setViewSettingMode] = useState(false);
  const { dynamictableHeader } = useSelector(
    (state: any) => state.dynamictableHeader
  );
  const dispatch = useDispatch();

  // Dynamic Table Header API Fetcher Function
  const dynamicTableHeaderFunction = handleAsync(async () => {
    const res = await DynamicTableHeaderApi("PO-LIST");
    dispatch(dynamicTableHeaderList(res.data?.data ?? null));
    return res;
  });
  const colsFormat =
    dynamictableHeader?.table_top?.buttons?.menu?.columns?.all_cols;
  const { execute: dynamicDataHeaderFetcher } = useApi(
    dynamicTableHeaderFunction
  );
  // Dynamic Table Data API Fetcher Function
  // const dynamicTableDataFunction = handleAsync(async () => {
  //   // const res = await DynamicTableDataApi();
  //   console.log("res", res);
  //   dispatch(dynamicTableDataList(res.data?.data ?? null));
  //   return res;
  // });

  // const { execute: dynamicDataTableFetcher } = useApi(dynamicTableDataFunction);
  useEffect(() => {
    dynamicDataHeaderFetcher();
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
          />
          <div className="w-full overflow-x-auto">
            <DynamicTable colsData={colsFormat} data={[]} />
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

export default PurchaseOrders;
